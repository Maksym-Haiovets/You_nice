import { ApiProperty } from "@nestjs/swagger";
import { ProcedureDocument } from "src/Procedure/ProcedureSchema";
import { UserDocument } from "src/User/UserSchema";

export class CreateRecordDto {
    @ApiProperty({example: 'ID-uniq string', description: 'ref to user'})
    UserID: String;

    @ApiProperty({example: 'ID-uniq string', description: 'ref to user staff'})
    CurrentStaff: String;

    @ApiProperty({example: 'type procedure', description: 'for find ref to procedure'})
    Procedure: String;

    @ApiProperty({example: '2021', description: 'year'})
    year: number;

    @ApiProperty({example: 'from 0 to 11', description: 'mounth'})
    mounth: number;

    @ApiProperty({example: 'from 1 to 31', description: 'day'})
    day: number;

    @ApiProperty({example: 'from 0 to 23', description: 'hour'})
    hour: number;

    @ApiProperty({example: 'from 0 to 59', description: 'minutes'})
    minute: number;
    
    //if make work with token through headers authoritate, so can detele access and refresh from here
    @ApiProperty({example: 'eyJhbGciOiJIUzICI6IkpXVCJ9.eyJ1c2VyaMzI3ZGZmYjZmM2IiLCJyb2xlIjoiVVNI2NjAwM30.ZdidEYalV4MM3epAtww1q8dijbZeiinoAC1INDKF'})
    readonly access: String
    
    @ApiProperty({example: 'eyJhbGciOiJIUzICI6IkpXVCJ9.eyJ1c2VyaMzI3ZGZmYjZmM2IiLCJyb2xlIjoiVVNI2NjAwM30.ZdidEYalV4MM3epAtww1q8dijbZeiinoAC1INDKF'})
    readonly refersh: String
}

export class SaveRecordDto {
    @ApiProperty({example: 'ID-uniq string', description: 'ref to user'})
    UserID: UserDocument;

    @ApiProperty({example: 'ID-uniq string', description: 'ref to user staff'})
    CurrentStaff: UserDocument;

    @ApiProperty({example: 'ID-uniq string', description: 'ref to procedure'})
    Procedure: ProcedureDocument;

    @ApiProperty({example: 'YYYY,MM,DD-HH,MM', description: 'data_time'})
    DATA_TIME: Date;
}