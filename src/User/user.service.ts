import { Injectable , HttpStatus, HttpCode, HttpException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
const bcrypt = require('bcryptjs');

import { User , UserDocument } from './UserSchema';
import { CreateUserDto } from './Dto/User.dto';
import { SALTROUNDS } from '../config';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async CreateUser(createUserDto: CreateUserDto): Promise<any> {
        let createdUser = await this.userModel.findOne({Fname: createUserDto.Fname, Lname: createUserDto.Lname});
        if(createdUser){
            throw new HttpException('This user already exist', HttpStatus.CONFLICT);
        }
        if(createUserDto.password !== createUserDto.PasswordConfirm){
            throw new HttpException('both passwords is not the same', HttpStatus.FORBIDDEN);
        }

        createUserDto.password = await bcrypt.hash(createUserDto.password, SALTROUNDS);

        return await new this.userModel(createUserDto).save();
    }

    async FindByEmail (email): Promise<any> {
        const user = await this.userModel.findOne({email});
        if(!user){
            throw new HttpException('this user not found', HttpStatus.NOT_FOUND);
        }
        return user
    }
    async FindByID (id): Promise<any> {
        const user = await this.userModel.findById({_id: id});
        if(!user){
            throw new HttpException('this user not found', HttpStatus.NOT_FOUND);
        }
        return user
    }
}
