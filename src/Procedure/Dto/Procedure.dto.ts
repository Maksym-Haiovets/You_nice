import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class ProcedureDto {
    @ApiProperty({example: 'type procedure'})
    @IsNotEmpty()
    readonly Name: String

    @ApiProperty({example: '250'})
    @IsNotEmpty()
    readonly Price: number

    @ApiProperty({example: '1', description: 'duration in Date format'})
    readonly Duration: number

    @ApiProperty({example: '1', description: 'means like 1 hour'})
    readonly Duration_hour: number

    @ApiProperty({example: '30', description: 'means like 30 minutes'})
    readonly Duration_minutes: number

    //if make work with token through headers authoritate, so can detele access and refresh from here
    @ApiProperty({example: 'eyJhbGciOiJIUzICI6IkpXVCJ9.eyJ1c2VyaMzI3ZGZmYjZmM2IiLCJyb2xlIjoiVVNI2NjAwM30.ZdidEYalV4MM3epAtww1q8dijbZeiinoAC1INDKF'})
    readonly access: String

    @ApiProperty({example: 'eyJhbGciOiJIUzICI6IkpXVCJ9.eyJ1c2VyaMzI3ZGZmYjZmM2IiLCJyb2xlIjoiVVNI2NjAwM30.ZdidEYalV4MM3epAtww1q8dijbZeiinoAC1INDKF'})
    readonly refersh: String
}

export class DeleteProcedureDto {
    @ApiProperty({example: 'eyJhbGciOiJIUzICI6IkpXVCJ9.eyJ1c2VyaMzI3ZGZmYjZmM2IiLCJyb2xlIjoiVVNI2NjAwM30.ZdidEYalV4MM3epAtww1q8dijbZeiinoAC1INDKF'})
    readonly access: String

    @ApiProperty({example: 'eyJhbGciOiJIUzICI6IkpXVCJ9.eyJ1c2VyaMzI3ZGZmYjZmM2IiLCJyb2xlIjoiVVNI2NjAwM30.ZdidEYalV4MM3epAtww1q8dijbZeiinoAC1INDKF'})
    readonly refersh: String
}