import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './UserSchema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Role, RoleSchema } from 'src/schemes/RolesSchema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
