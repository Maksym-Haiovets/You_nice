import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { URI } from './config';
import { UserModule } from './User/user.module';
import { ProcedureModule } from './Procedure/procedure.module'
import { AuthJwtModule } from './auth-jwt/auth-jwt.module';

@Module({
  imports: [
    UserModule,
    ProcedureModule,
    AuthJwtModule,
    MongooseModule.forRoot(URI, 
      { useFindAndModify: false, 
        useNewUrlParser: true,
        useCreateIndex: true
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}