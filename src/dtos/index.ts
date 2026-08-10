import { IsDefined, IsEmail, IsString, IsStrongPassword } from "class-validator";

export class BaseUserDto {
    @IsString()
    username!: string;

    @IsEmail()
    @IsDefined()
    email!: string;

    @IsDefined()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password!: string;
}


export class Token {
    @IsString()
    token!: string;
}