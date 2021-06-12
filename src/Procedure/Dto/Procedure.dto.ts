import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class ProcedureDto {
    @ApiProperty({example: 'type procedure'})
    @IsNotEmpty()
    readonly Name: String

    @ApiProperty({example: '250'})
    @IsNotEmpty()
    readonly Price: number

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