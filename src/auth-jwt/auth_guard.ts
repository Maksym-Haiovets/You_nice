import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import { AuthJwtService } from "src/auth-jwt/auth-jwt.service";
const jwt = require('jsonwebtoken');

import { jwttoken } from '../config';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor() {}
    
    async canActivate(context: ExecutionContext):  Promise<any> {
      
      const req = context.switchToHttp().getRequest()
        
      const accessToken = req.body.access;
      const refreshToken = req.body.refresh;
      
      if(!accessToken){
        throw new HttpException('token is not provided', HttpStatus.UNAUTHORIZED)
      }
      try {
        jwt.verify(accessToken, jwttoken.secret); 
        return true
      } 
      catch (error) {
        if(error instanceof jwt.TokenExpiredError){
          if(!refreshToken){
            throw new HttpException('refresh token is not provided', HttpStatus.UNAUTHORIZED)
          }
        try {
          const user = jwt.verify(refreshToken, jwttoken.secret);
          
          const {accesstoken: access, refreshtoken: refresh} = await AuthJwtService.prototype.updateToken(user.userid, user.role);
          req.body.access = access;
          req.body.refresh = refresh;
          return true
        } 
        catch (error) {
          if(error instanceof jwt.JsonWebTokenError){
            throw new HttpException('invalid refresh token or refresh token is expired', HttpStatus.UNAUTHORIZED)
          }
        } 
            }
            if(error instanceof jwt.JsonWebTokenError){
              throw new HttpException('invalid access token ', HttpStatus.UNAUTHORIZED)
        }
        throw new HttpException('Something went wrong', HttpStatus.UNAUTHORIZED)
      }
    }
}