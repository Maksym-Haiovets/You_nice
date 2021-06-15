import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RecordsProcedureService } from './records.procedures.service';

import { CreateRecordDto } from './Dto/CreateRecords.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/Guards/RoleDecorator';
import { AuthGuard } from 'src/auth-jwt/auth_guard';
import { CheckRole_Guard } from 'src/Guards/checkRole_guard';

@ApiTags('Make record on procedure')
@Controller('record')
export class RecordsProcedureController {
  constructor(private readonly recordsProcedureService: RecordsProcedureService ) {}

  @ApiOperation({summary: 'Create record'})
  @ApiResponse({status: HttpStatus.NO_CONTENT})
  @Post('create-record')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  createRecord(@Body() createRecordDto: CreateRecordDto){
    return this.recordsProcedureService.createRecord(createRecordDto);
  }

  @ApiOperation({summary: 'Update record'})
  @ApiResponse({status: HttpStatus.NO_CONTENT})
  @Put('update-record/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  updateRecords(@Param('id') id: String ,@Body() createRecordDto: CreateRecordDto){
    return this.recordsProcedureService.updateRecords(id, createRecordDto);
  }

  @ApiOperation({summary: 'Delete record, only for ADMIN or STAFF'})
  @ApiResponse({status: HttpStatus.NO_CONTENT})
  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'STAFF')
  @UseGuards(CheckRole_Guard)
  removeRecord(@Param('id') id: String){
    return this.recordsProcedureService.removeRecord(id);
  }

  @ApiOperation({summary: 'Show all free time between another records by current staff ID'})
  @ApiResponse({status: HttpStatus.OK})
  @Post('show-free-time/:id')
  @HttpCode(HttpStatus.OK)
  async FindFreetimeByCurrentStaffOnWeek(@Param('id') id: String) {
    const data = await this.recordsProcedureService.FindFreetimeByCurrentStaffOnWeek(id);
    return JSON.stringify(Array.from(data.entries()))
  }
}
