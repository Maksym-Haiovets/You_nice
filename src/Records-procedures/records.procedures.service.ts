import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/User/user.service';
import { ProcedureService } from '../Procedure/procedure.service'
import { ActiveProcedure, ActiveProcedureDocument } from './ActiveProcedures';
import { CreateRecordDto, SaveRecordDto } from './Dto/CreateRecords.dto';
import { RecordsProceduresHelper } from './records.procedures.helper';

@Injectable()
export class RecordsProcedureService {

    constructor(
        private readonly userService: UserService,
        private readonly ProcedureService: ProcedureService,
        private readonly recordsProceduresHelper: RecordsProceduresHelper,
        @InjectModel(ActiveProcedure.name) private ActiveProcedureModel: Model<ActiveProcedureDocument>,
    ) {}

    private async createRecordFOR_save (createRecordDto){
        const record: SaveRecordDto = new SaveRecordDto();
        record.DATA_TIME = new Date(
            createRecordDto.year,
            createRecordDto.mounth,
            createRecordDto.day,
            createRecordDto.hour,
            createRecordDto.minutes
        )
        record.UserID = await this.userService.FindByID(createRecordDto.UserID);
        record.CurrentStaff = await this.userService.FindByID(createRecordDto.CurrentStaff);
        record.Procedure = await this.ProcedureService.GetOneProcedure(createRecordDto.Procedure);

        return record;
    }

    async createRecord(createRecordDto: CreateRecordDto){

        const record: SaveRecordDto = await this.createRecordFOR_save(createRecordDto);

        const recordCandidat = await this.ActiveProcedureModel.findOne({
            UserID: record.UserID,
            CurrentStaff: record.CurrentStaff,
            Procedure: record.Procedure
        })
    
        if(recordCandidat){
            throw new HttpException('this record already exist, you can update your record', HttpStatus.BAD_REQUEST);
        }
        //check date time for create record
        const checktime = await this.recordsProceduresHelper.Time_Validator(
            record.DATA_TIME, 
            record.CurrentStaff._id, 
            record.Procedure.Duration,
            createRecordDto.year,
            createRecordDto.mounth,
            createRecordDto.day,
        );
        if(!checktime){
            throw new HttpException('this time is reserved or this service don`t work in this time', HttpStatus.BAD_REQUEST);
        }

        await new this.ActiveProcedureModel(record).save()
    }

    async updateRecords (id, createRecordDto: CreateRecordDto) {
        const recordCandidat = await this.ActiveProcedureModel.findOne({_id: id})
        if(!recordCandidat){
            throw new HttpException('this record not exist', HttpStatus.BAD_REQUEST);
        }
        //check date time
        const record: SaveRecordDto = await this.createRecordFOR_save(createRecordDto);

        //check date time for update record
        const checktime = await this.recordsProceduresHelper.Time_Validator(
            record.DATA_TIME, 
            record.CurrentStaff._id, 
            record.Procedure.Duration,
            createRecordDto.year,
            createRecordDto.mounth,
            createRecordDto.day,
        );
        if(!checktime){
            throw new HttpException('this time is reserved or this service don`t work in this time', HttpStatus.BAD_REQUEST);
        }

        await this.ActiveProcedureModel.replaceOne({_id: recordCandidat._id }, record)
    }

    async removeRecord (id) {
        let Record = await this.ActiveProcedureModel.findById({ _id: id});
        if(!Record){
            throw new HttpException('this record not exist', HttpStatus.NOT_FOUND)
        }
        await this.ActiveProcedureModel.findByIdAndDelete({ _id: id});
    }

    async FindFreetimeByCurrentStaffOnWeek(CurrentStaffID){
        //const data = await this.recordsProceduresHelper.FindFreetimeByCurrentStaffOnWeek(CurrentStaffID);
        //console.log('in service:', data)
        //for(let i = 0; i < data.)
        return await this.recordsProceduresHelper.FindFreetimeByCurrentStaffOnWeek(CurrentStaffID);
    }
}
