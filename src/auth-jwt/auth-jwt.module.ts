import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from 'src/schemes/RolesSchema';
import { UserService } from 'src/User/user.service';
import { User, UserSchema } from 'src/User/UserSchema';
import { AuthJwtController } from './auth-jwt.controller';
import { AuthJwtService } from './auth-jwt.service';
import { Token, TokenSchema } from './TokenSchema';
import { UserModule } from '../User/user.module'
import { AuthGuard } from './auth_guard';

@Module({
  imports: [    
    UserModule,
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthJwtController],
  providers: [AuthJwtService]
})
export class AuthJwtModule {}
