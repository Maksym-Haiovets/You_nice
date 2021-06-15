import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { URI } from './config';
import { UserModule } from './User/user.module';
import { ProcedureModule } from './Procedure/procedure.module';
import { AuthJwtModule } from './auth-jwt/auth-jwt.module';
import { RcordsProcedureModule } from './Records-procedures/records.procedures.module';

@Module({
  imports: [
    UserModule,
    ProcedureModule,
    AuthJwtModule,
    MongooseModule.forRoot(URI, 
      { useFindAndModify: false, 
        useNewUrlParser: true,
        useCreateIndex: true
      }),
    RcordsProcedureModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}