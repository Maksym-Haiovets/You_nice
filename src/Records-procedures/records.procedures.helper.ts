import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Collection, Model } from "mongoose";

import { ActiveProcedure, ActiveProcedureDocument } from "./ActiveProcedures";
import { ProcedureService } from "src/Procedure/procedure.service";

import {START_DAY, END_DAY} from '../config'
import { Console } from "console";

@Injectable()
export class RecordsProceduresHelper {
    constructor (
        private readonly ProcedureService: ProcedureService,
        @InjectModel(ActiveProcedure.name) private ActiveProcedureModel: Model<ActiveProcedureDocument>
    ){}
    
    //find all enough time for some procedures
    async FindFreetimeByCurrentStaffOnWeek (CurrentStaffID) {//: Promise<IterableIterator<[String, String]>>
        let activeRecords_IN_CurrnetStaff = await this.ActiveProcedureModel.find({CurrentStaff: CurrentStaffID})
        
        let arrayStartProcedureDates = []
        for(let i = 0; i < activeRecords_IN_CurrnetStaff.length; i++){
            arrayStartProcedureDates.push(Number(Date.parse(activeRecords_IN_CurrnetStaff[i].DATA_TIME.toString())))
        }
        arrayStartProcedureDates.sort((a,b) => a - b)
        ///// 
        let arrayEndProcedureDates = []
        for(let i = 0; i < activeRecords_IN_CurrnetStaff.length; i++){
            const procedure = await this.ProcedureService.FindById(activeRecords_IN_CurrnetStaff[i].Procedure)
            arrayEndProcedureDates[i] = arrayStartProcedureDates[i] + procedure.Duration
        }
        const freeDates: Map<String,String> = new Map()
        for(let i = 0; i < arrayStartProcedureDates.length; i++){
            if(arrayStartProcedureDates[i] !== arrayStartProcedureDates[0]){
                let diff = arrayStartProcedureDates[i] - arrayEndProcedureDates[i - 1]
            
                if(diff > 5_400_000){
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
        let activeRecords_IN_CurrnetStaff = await this.ActiveProcedureModel.find({CurrentStaff: CurrentStaffID})

        const OriginStartProcedureDate = Number(Date.parse(date_time.toString()))
        const OriginEndProcedureDate = Number(Date.parse(date_time.toString()) + Duration)
    
        // at first check START and END day
        const StartWorkDay = new Date(year,mounth,day,START_DAY,0)
        const EndWorkDay = new Date(year,mounth,day,END_DAY,0)

        // check for start day
        if(OriginStartProcedureDate < Number(Date.parse(StartWorkDay.toString()))){
            return false
        }
        // check for end day
        if(OriginEndProcedureDate > Number(Date.parse(EndWorkDay.toString()))){
            return false
        }
        ////
        // sort array with dates
        if(activeRecords_IN_CurrnetStaff.length == 0){
            return true
        }
        let arrayDates = []
        for(let i = 0; i < activeRecords_IN_CurrnetStaff.length; i++){
            arrayDates.push(Number(Date.parse(activeRecords_IN_CurrnetStaff[i].DATA_TIME.toString())))
        }
        arrayDates.sort((a,b) => a - b)
        arrayDates.unshift(Number(Date.parse(StartWorkDay.toString())))
        arrayDates.push(Number(Date.parse(EndWorkDay.toString())))//
        ///

        //here we are checking free range date for create new record in free time
        for(let i = 0; i < arrayDates.length; i++){
            if(OriginEndProcedureDate <= arrayDates[i]){// all cool
                for(let j = 0; j < activeRecords_IN_CurrnetStaff.length; j++){
                    if(Number(Date.parse(activeRecords_IN_CurrnetStaff[j].DATA_TIME.toString())) == arrayDates[i - 1]){
                        if((i - 1) == 0){
                            return true
                        }
                        const procedure = await this.ProcedureService.FindById(activeRecords_IN_CurrnetStaff[j].Procedure)
                        arrayDates[i - 1] += procedure.Duration
                        if(arrayDates[i - 1] <= OriginStartProcedureDate){
                            return true
                        }
                    }
                }
            }
        }
        return false
    }
}














//new Date(OriginEndProcedureDate).toLocaleString()
/*
      console.log('local str: ', duration.toLocaleTimeString())
        console.log('str: ', duration.toString())
        
        //console.log(date_time.g)
        //console.log(date_time.toString())
        //console.log(Date.parse(date_time.toString()));
        console.log('Date.parse(date_time.toString()): ', Date.parse(date_time.toString()))
        console.log('Date.parse(duration.toString()): ', Date.parse(duration.toString()))
        let diff = Number( Date.parse(date_time.toString()) - Date.parse(duration.toString()) )
        console.log(diff)
        console.log('origin data: ', date_time.toLocaleString())
        console.log("data diff: ", diff.toLocaleString())
        let data_with_duration = new Date(Number( Date.parse(date_time.toString()) +   5_400_000  ))
        console.log('data_with_duration: ', data_with_duration);
        console.log(data_with_duration.toLocaleString());
        
*/

/*
///
        let date = new Date(2021, 5, 12, 14, 0, 0);
        let date2 = new Date(2021, 5, 12, 14, 0, 0);
        console.log('data 1: ', date);
        console.log('date 2: ', date2.toLocaleTimeString());// correct
        //console.log(Date.parse(date2.toLocaleString()));
        let diff = new Date(Number(Date.parse(date2.toLocaleString())) - Date.parse(date.toLocaleString()));
        console.log('parse diffL: ', Date.parse(diff.toLocaleString()));
        console.log(diff.getTime());
////
*/

        /*const newArr = await activeRecords_IN_CurrnetStaff.map(async (element) => {
            let AnotherProcedure = await this.ProcedureService.FindById(element.Procedure);

            arr.push(Number(Date.parse(element.DATA_TIME.toString())));
            //console.log(arr);
            //return arr;
        })*/
        //console.log('new arr: ', newArr);


        /*await activeRecords_IN_CurrnetStaff.forEach(async (element) => {

            let AnotherProcedure = await this.ProcedureService.FindById(element.Procedure);
            //console.log('AnotherProcedure: ', AnotherProcedure.Duration)
            //console.log('Start AnotherProcedure: ', element.DATA_TIME.toLocaleString())
            //console.log('AnotherProcedure END: ', new Date( Date.parse(element.DATA_TIME.toString()) + AnotherProcedure.Duration ).toLocaleString())

            //let duration = await this.ProcedureService.FindById(element.Procedure);
            //console.log('duration-Duration: ', duration.Duration);
            //console.log('origin date to local string: ', date_time.toLocaleString())
            //console.log('Date wit duration: ', new Date(Number( Date.parse(date_time.toString()) +  duration.Duration )).toLocaleString())
        });*/