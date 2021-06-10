import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { Procedure, ProcedureSchema } from './ProcedureSchema';
import { ProcedureController } from './procedure.controller'
import { ProcedureService } from './procedure.service'

@Module ({
    imports: [
        MongooseModule.forFeature([{name: Procedure.name, schema: ProcedureSchema}])
    ],
    controllers: [ProcedureController],
    providers: [ProcedureService],
    exports: [ProcedureService]
  })
  export class ProcedureModule {}
  