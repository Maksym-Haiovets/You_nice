import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
const bcrypt = require('bcryptjs');
import { v4 as uuidv4 } from 'uuid';
const jwt = require('jsonwebtoken');

import { UserService } from '../User/user.service'
import { Token, TokenDocument } from './TokenSchema';
import { Role, RoleDocument } from 'src/schemes/RolesSchema';
import { CreateTokenDto } from './token.dto'
import { AuthorizationUserDto, CreateUserDto } from 'src/User/Dto/User.dto';
import { DEFAULT_ROLE, jwttoken } from 'src/config';

//const {secret, tokens} = require('../config').jwttoken;

function generateAccessToken (userid, role) {
    const payload = {
        userid,
        role,
        type: jwttoken.tokens.access.type
    };
    const options = {expiresIn: jwttoken.tokens.access.expiresIn};
    
    return jwt.sign(payload, jwttoken.secret, options);;
}

function generateRefreshToken () {
    const payload = {
        id: uuidv4(),
        type: jwttoken.tokens.refresh.type
    };
    const options = {expiresIn: jwttoken.tokens.refresh.expiresIn};
    
    return {
        id :payload.id,
        token: jwt.sign(payload, jwttoken.secret, options)
    };
}

@Injectable()
export class AuthJwtService {
    constructor( 
        private readonly userService: UserService,
        @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
        @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    ) {}

    private async replaceDBrefreshToken (tokenID, userID) {
        return this.tokenModel.findOneAndRemove({userId: userID})
        .exec()
        .then(() => {
            let newRefreshToken = new CreateTokenDto();
            newRefreshToken.tokenId = tokenID;
            newRefreshToken.userId = userID;
            new this.tokenModel(newRefreshToken).save()
        })
    }; 
    async updateToken (userId, role: String) {
        const accesstoken = generateAccessToken(userId, role);
        const refreshtoken = generateRefreshToken();
        
        return await this.replaceDBrefreshToken(refreshtoken.id, userId)
        .then(() => {
            return {
                accesstoken,
                refreshtoken: refreshtoken.token,
                role
            };
        })
    }

    //below processing of endPoints
    async CreateUser(createUserDto: CreateUserDto): Promise<void> { 
        let newRefreshToken = new CreateTokenDto();
        createUserDto.role = await this.roleModel.findOne({value: DEFAULT_ROLE})
        const createdUser = await this.userService.CreateUser(createUserDto);

        newRefreshToken.userId = createdUser._id;
        newRefreshToken.tokenId = '';
        new this.tokenModel(newRefreshToken).save()
    }

    async authorization (authorizationUserDto: AuthorizationUserDto): Promise<any> {
        const user = await this.userService.FindByEmail(authorizationUserDto.login);
        try{    
            if(!await bcrypt.compare(authorizationUserDto.password, user.password)){
                throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
            }
        }
        catch(error){
            throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
        }
        const role = await this.roleModel.findById(user.role);

        return await this.updateToken(user._id, role.value)
        .then( tokens => {
            return ({ 
                access: tokens.accesstoken,
                refresh: tokens.refreshtoken
            })}       
        );
    }
}
