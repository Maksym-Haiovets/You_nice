import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose'
import { Procedure } from 'src/Procedure/ProcedureSchema';
import { User } from 'src/User/UserSchema';

export type ActiveProcedureDocument = ActiveProcedure & mongoose.Document;

@Schema()
export class ActiveProcedure {
    @ApiProperty({example: 'ID-uniq string', description: 'ref to user'})
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    UserID: User;


    @ApiProperty({example: 'ID-uniq string', description: 'ref to user staff'})
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    CurrentStaff: User;

    @ApiProperty({example: 'ID-uniq string', description: 'ref to user staff'})
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Procedure'})
    Procedure: Procedure;

    @ApiProperty({example: 'YYYY,MM,DD-HH,MM', description: 'data_time'})
    @Prop()
    DATA_TIME: Date;
}

export const ActiveProcedureSchema = SchemaFactory.createForClass(ActiveProcedure);