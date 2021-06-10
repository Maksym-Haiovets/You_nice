import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class ProcedureDto {
    @ApiProperty({example: 'type procedure'})
    @IsNotEmpty()
    readonly Name: String

    @ApiProperty({example: '250'})
    @IsNotEmpty()
    readonly Price: number
}