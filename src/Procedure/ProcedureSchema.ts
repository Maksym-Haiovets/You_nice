import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export type ProcedureDocument = Procedure & mongoose.Document;

@Schema()
export class Procedure {
    @ApiProperty({example: 'type procedure'})
    @Prop({ unique: true, required: true })
    Name: String;

    @ApiProperty({example: '250'})
    @Prop({ required: true })
    Price: number;
}

export const ProcedureSchema = SchemaFactory.createForClass(Procedure);