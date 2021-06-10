import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
    @Prop({ type: String, unique: true, default: "USER" })
    value: String;
}

export const RoleSchema = SchemaFactory.createForClass(Role);