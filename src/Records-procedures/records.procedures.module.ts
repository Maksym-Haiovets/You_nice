import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProcedureModule } from 'src/Procedure/procedure.module';
import { UserModule } from 'src/User/user.module';
import { ActiveProcedure, ActiveProcedureSchema } from './ActiveProceduresSchema';
import { RecordsProcedureController } from './records.procedures.controller';
import { RecordsProceduresHelper } from './records.procedures.helper';
import { RecordsProcedureService } from './records.procedures.service';

@Module({
    imports:[
        UserModule,
        ProcedureModule,
        MongooseModule.forFeature([{ name: ActiveProcedure.name, schema: ActiveProcedureSchema }]),
    ],
    controllers: [RecordsProcedureController],
    providers: [RecordsProcedureService, RecordsProceduresHelper]
})

export class RcordsProcedureModule {}