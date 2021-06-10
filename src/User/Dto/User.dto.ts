import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty , IsMobilePhone, IsFullWidth, min, max, MinLength, MaxLength} from 'class-validator';
import { RoleDocument } from '../../schemes/RolesSchema'

export class CreateUserDto {

    readonly _id: string
    @ApiProperty({example: 'Name', description: 'user name'})
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(12)
    readonly Fname: string

    @ApiProperty({example: 'last name', description: 'user last name'})
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(12)
    readonly Lname: string

    @ApiProperty({example: '38 0XX-XXX-XX-XX', description: 'without spaces'})
    @IsMobilePhone()
    @MinLength(10)
    @MaxLength(12)
    readonly Phone_number: String

    @ApiProperty({example: 'password'})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(12)
    password: String

    @ApiProperty({example: 'password', description: 'second variable password for maching'})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(12)
    readonly PasswordConfirm: String

    @ApiProperty({example: 'test@gmail.com'})
    @IsEmail()
    readonly email: String

    role: RoleDocument
  }

  export class AuthorizationUserDto {
    @ApiProperty({example: 'test@gmail.com'})
    @IsNotEmpty()
    @IsEmail()
    readonly login: String

    @ApiProperty({example: 'password'})
    @IsNotEmpty()
    readonly password: String
}