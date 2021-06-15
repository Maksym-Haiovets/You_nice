import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ActiveProcedure, ActiveProcedureDocument } from "./ActiveProceduresSchema";
import { ProcedureService } from "src/Procedure/procedure.service";
import {START_DAY, END_DAY} from '../config'

@Injectable()
export class RecordsProceduresHelper {
    constructor (
        private readonly ProcedureService: ProcedureService,
        @InjectModel(ActiveProcedure.name) private ActiveProcedureModel: Model<ActiveProcedureDocument>
    ){}
    
    //searching all enough time for some procedures
    // START DATE - BEGINNING OF PROCEDURE
    // END DATE - FINISH OF PROCUDERE (START PROCEDURE + DURATION OF PROCEDURE) 
    async FindFreetimeByCurrentStaffOnWeek (CurrentStaffID): Promise<Map<String, String>> {
        let activeRecords_BY_CurrnetStaff = await this.ActiveProcedureModel.find({CurrentStaff: CurrentStaffID})
        
        //create new array dates with the beginning of procedures for sort it later (min,,, max)
        //dates i take from Active-Procedure collection
        let arrayStartProcedureDates = []
        for(let i = 0; i < activeRecords_BY_CurrnetStaff.length; i++){
            arrayStartProcedureDates.push(Number(Date.parse(activeRecords_BY_CurrnetStaff[i].DATA_TIME.toString())))
        }
        arrayStartProcedureDates.sort((a,b) => a - b)
        ///// 
        //here create new array with dates with the beginning of procedures + duration of current procedure
        //and sort it too
        let arrayEndProcedureDates = []
        for(let i = 0; i < activeRecords_BY_CurrnetStaff.length; i++){
            const procedure = await this.ProcedureService.FindById(activeRecords_BY_CurrnetStaff[i].Procedure)
            arrayEndProcedureDates[i] = arrayStartProcedureDates[i] + procedure.Duration
        }

        const freeDates: Map<String,String> = new Map()//save free duration here [start free time, end free time]
        for(let i = 0; i < arrayStartProcedureDates.length; i++){
            //code dosn`t pass the condition only one time here
            if(arrayStartProcedureDates[i] !== arrayStartProcedureDates[0]){
                let diff = arrayStartProcedureDates[i] - arrayEndProcedureDates[i - 1]
            
                if(diff >= 5_400_000){
                    freeDates.set(
                        String(new Date(arrayEndProcedureDates[i - 1]).toLocaleString()), 
                        String(new Date(arrayStartProcedureDates[i]).toLocaleString())
                    )   
                }   
            }
        }
        return freeDates
    }

    //Check user entered date_time, if entered time is reserved, return false 
    async Time_Validator(
        date_time: Date, 
        CurrentStaffID, 
        Duration,
        year,
        mounth,
        day,
        ): Promise<boolean>{
        // get all active procedure by current staff
        let activeRecords_BY_CurrnetStaff = await this.ActiveProcedureModel.find({CurrentStaff: CurrentStaffID})
        
        // create variables Entered START and END Procedure 
        const EnteredStartProcedureDate = Number(Date.parse(date_time.toString()))
        const EnteredEndProcedureDate = Number(Date.parse(date_time.toString()) + Duration)
    
        // at first check START and END day
        const StartWorkDay = new Date(year,mounth,day,START_DAY,0)
        const EndWorkDay = new Date(year,mounth,day,END_DAY,0)

        // check for start day
        if(EnteredStartProcedureDate < Number(Date.parse(StartWorkDay.toString()))){
            return false
        }
        // check for end day
        if(EnteredEndProcedureDate > Number(Date.parse(EndWorkDay.toString()))){
            return false
        }
        //////
        // if collection with records is empty, so return true
        // because if entered time pass condition with START and END day and this collections with records is empty,
        // its means that all day is free
        if(activeRecords_BY_CurrnetStaff.length == 0){
            return true
        }
        /////
        // sort array with dates
        // only start dates
        let arrayDates = []
        for(let i = 0; i < activeRecords_BY_CurrnetStaff.length; i++){
            arrayDates.push(Number(Date.parse(activeRecords_BY_CurrnetStaff[i].DATA_TIME.toString())))
        }
        arrayDates.sort((a,b) => a - b)
        arrayDates.unshift(Number(Date.parse(StartWorkDay.toString())))
        arrayDates.push(Number(Date.parse(EndWorkDay.toString())))
        ///

        // here checking free range dates for create new record in free time 
        // in arrayDates only START dates of all procedure by current staff
        for(let i = 0; i < arrayDates.length; i++){
            // search start date that is smaller then entered end date
            if(EnteredEndProcedureDate <= arrayDates[i]){
                for(let j = 0; j < activeRecords_BY_CurrnetStaff.length; j++){
                    // here search previous date in Active-Records collection
                    // and there take duration in record, 
                    // for find END time (start procedure + duration) of previous record (procedure)
                    // for check entered START procedure with END previous procedure
                    // if entered START > END previous procedure, return true
                    if(Number(Date.parse(activeRecords_BY_CurrnetStaff[j].DATA_TIME.toString())) == arrayDates[i - 1]){
                        if((i - 1) == 0){
                            return true
                        }
                        const procedure = await this.ProcedureService.FindById(activeRecords_BY_CurrnetStaff[j].Procedure)
                        arrayDates[i - 1] += procedure.Duration
                        if(arrayDates[i - 1] <= EnteredStartProcedureDate){
                            return true
                        }
                    }
                }
            }
        }
        return false
    }
}