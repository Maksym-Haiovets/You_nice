import { ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

@ApiTags(';mmf')
export class ResAuthorizationUserTypeForSwagger {
    @ApiProperty({example: 'USER'})
    @IsNotEmpty()
    role: String

    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2MGMwZYXQiOjE2MjMyNjQyMDMsImV4cCI6MTYyMzI2NjAwM30.ZdidEYalV4MM3epAtww1q8dijbZeiinoAC1INDKFlt0'})
    @IsNotEmpty()
    access: String

    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5ZDFlOWY3LTUNmE2YyIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNjIzMjY0MjAzLCJleHAiOjE2MjMyNzE0MDN9.IlO8HWy2b-2TDknuuiWiFLn6BHKJ3jYRlkUfY1NOvMk'})
    @IsNotEmpty()
    refresh: String

    @ApiProperty({example: '60c0f8d06e680327dffb6f3b'})
    @IsNotEmpty()
    id: String
}
