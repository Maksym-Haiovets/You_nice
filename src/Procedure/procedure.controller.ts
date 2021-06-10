import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Header, 
    HttpCode, 
    HttpStatus, 
    Param, 
    Post, 
    Put, 
    UseGuards 
} from "@nestjs/common";

import { ProcedureService } from './procedure.service'
import { ProcedureDto } from './Dto/Procedure.dto'
import { Procedure, ProcedureDocument } from './ProcedureSchema'

import { AuthGuard } from '../auth-jwt/auth_guard'
import { CheckRole_Guard } from '../Guards/checkRole_guard'
import { Roles } from '../Guards/RoleDecorator'
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Procedure')
@Controller('procedure')
export class ProcedureController {
    constructor (private readonly procedureSecrvice: ProcedureService) {}
    //three routes below, access only for ADMIN
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    @UseGuards(AuthGuard)
    @Roles('ADMIN')
    @UseGuards(CheckRole_Guard)
    CreateProcedure(@Body() procedureDto: ProcedureDto): Promise<void> { 
        return this.procedureSecrvice.CreateProcedure(procedureDto);
    }

    @Put('update/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Header('Cache-Control', 'none')// what is that?
    @UseGuards(AuthGuard)
    @Roles('ADMIN')
    @UseGuards(CheckRole_Guard)
    UpdateOneProcedure(@Param('id') id: string, @Body() procedureDto: ProcedureDto): Promise<void> {
        return this.procedureSecrvice.UpdateOneProcedure(id, procedureDto);
    }

    @Delete('delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Header('Cache-Control', 'none')
    @UseGuards(AuthGuard)
    @Roles('ADMIN')
    @UseGuards(CheckRole_Guard)
    RemoveOneProcedure(@Param('id') id: string): Promise<void> {
        return this.procedureSecrvice.RemoveOneProcedure(id);
    }

    @Get()
    @ApiOperation({summary: 'Get all procedure'})
    @ApiResponse({status: HttpStatus.OK, type: [Procedure]})
    @HttpCode(HttpStatus.OK)
    GetAllProcedure(): Promise<ProcedureDocument[]> {
        return this.procedureSecrvice.GetAllProcedure();
    }
}