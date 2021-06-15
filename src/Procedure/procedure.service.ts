import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

import { Procedure, ProcedureDocument} from './ProcedureSchema'
import { ProcedureDto } from './Dto/Procedure.dto'
import { tmpdir } from "os";

@Injectable()
export class ProcedureService {
    constructor (
        @InjectModel(Procedure.name) private procedureModel: Model<ProcedureDocument>,
    ) {}
    
    async CreateProcedure (procedureDto: ProcedureDto): Promise<void> {
        let procedure = await this.procedureModel.findOne({ Name: procedureDto.Name});
        if(procedure){
            throw new HttpException('this procedure already exist', HttpStatus.CONFLICT)
        }
        await new this.procedureModel(procedureDto).save();
    }

    async UpdateOneProcedure (id, procedureDto: ProcedureDto): Promise<void> {
        let procedure = await this.procedureModel.findById({ _id: id});
        if(!procedure){
            throw new HttpException('this procedure not exist', HttpStatus.NOT_FOUND)
        }
        await this.procedureModel.replaceOne({_id: procedure._id}, procedureDto);
    }

    async RemoveOneProcedure (id): Promise<void> {
        let procedure = await this.procedureModel.findById({ _id: id});
        if(!procedure){
            throw new HttpException('this procedure not exist', HttpStatus.NOT_FOUND)
        }
        await this.procedureModel.findByIdAndDelete({ _id: id});
    }

    async GetAllProcedure (): Promise<ProcedureDocument[]> {
        return await this.procedureModel.find();
    }

    async GetOneProcedure (TypeProcedure): Promise<ProcedureDocument> {
        return await this.procedureModel.findOne({Name: TypeProcedure});
    }
    async FindById (id): Promise<ProcedureDocument> {
        return await this.procedureModel.findById({_id: id});
    }
}