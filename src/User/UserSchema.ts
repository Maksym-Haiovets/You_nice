import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../schemes/RolesSchema'

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
    @ApiProperty({example: 'Name', description: 'user name'})
    @Prop()
    Fname: string;

    @ApiProperty({example: 'Last name'})
    @Prop()
    Lname: string;

    @ApiProperty({example: '38 0XX-XXX-XX-XX', description: 'without spaces'})
    @Prop()
    Phone_number: number;

    @ApiProperty({example: 'password'})
    @Prop()
    password: String;

    @ApiProperty({example: 'test@gmail.com'})
    @Prop()
    email: String;

    @ApiProperty({example: 'uniq string', description: 'ref for table role'})
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);