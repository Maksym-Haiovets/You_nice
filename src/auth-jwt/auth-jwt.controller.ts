import { Body, Controller, Header, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthorizationUserDto, CreateUserDto } from 'src/User/Dto/User.dto';
import { AuthJwtService } from './auth-jwt.service';
import { ResAuthorizationUserType } from './type.respons.auth.swg';

@ApiTags('Registration and Authorization')
@Controller('auth')
export class AuthJwtController {
    constructor( private readonly auhtJWTService: AuthJwtService ) {}

    @ApiOperation({summary: 'User registration'})
    @ApiResponse({status: HttpStatus.CREATED})
    @Post('registration')
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    CreateUser(@Body()createUserDto: CreateUserDto): Promise<void> { 
        return this.auhtJWTService.CreateUser(createUserDto);
    }

    @ApiOperation({summary: 'User authorization'})
    @ApiResponse({status: HttpStatus.OK, type: ResAuthorizationUserType})
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @Header('Cache-Control', 'none')
    authorization(@Body() authorizationUserDto: AuthorizationUserDto): Promise<any>{
        return this.auhtJWTService.authorization(authorizationUserDto);
    }
}
