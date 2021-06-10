import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import { Observable } from "rxjs";
const jwt = require('jsonwebtoken');

import { jwttoken } from '../config';
import { ROLES_KEY } from './RoleDecorator'

@Injectable()
export class CheckRole_Guard implements CanActivate {
    constructor(private reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {//:  Promise<any>
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            
            if (!requiredRoles.toString()) {
                return true;
            }
            const req = context.switchToHttp().getRequest()
            const accessToken = req.body.access;

            const user = jwt.verify(accessToken, jwttoken.secret);

            if(!requiredRoles.includes(user.role)){
                throw new HttpException('no access', HttpStatus.FORBIDDEN)
            }
            return true
        }
        catch (error) {
            throw new HttpException('no access', HttpStatus.FORBIDDEN)
        }
    }
}