import { Body, Controller, HttpCode, HttpStatus, Param, Post, UseGuards} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth-jwt/auth_guard';
import { Roles } from 'src/Guards/RoleDecorator';

import { CheckRole_Guard } from 'src/Guards/checkRole_guard';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor( private readonly userService: UserService ) {}

  @Post('change-role/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Chenge role for user (can only admin)'})
  @ApiResponse({status: HttpStatus.OK})
  @UseGuards(AuthGuard)
  @UseGuards(CheckRole_Guard)
  @Roles('ADMIN')
  ChangeRoleUser(@Param('id') id: String, @Body() newRole, Speciality){
    return this.userService.ChangeRoleUser(id, newRole, Speciality);
  }
}