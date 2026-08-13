import { IsEmail } from "class-validator";

export class FindOneUserDto {
  @IsEmail()
  email!: string;
}
