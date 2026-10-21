import { Transform } from "class-transformer";
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUUID,
} from "class-validator";
import { TodoPriority, TodoStatus } from "../enum/todos.enum";

const toUpperCaseIfString = ({ value }: { value: unknown }) => {
  return typeof value === "string" ? value.toUpperCase() : value;
};

export class BaseUserDto {
  @IsUUID()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  email!: string;

  @IsDefined()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password!: string;
}

export class BaseTokenDto {
  @IsNotEmpty()
  @IsString()
  token!: string;
}

export class BaseTodosDto {
  @IsUUID()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  @Transform(toUpperCaseIfString)
  @IsEnum(TodoStatus, {
    each: false,
    message: `Status must be either ${Object.values(TodoStatus).join(", ")}`,
  })
  status!: TodoStatus;

  @IsString()
  @IsNotEmpty()
  @Transform(toUpperCaseIfString)
  @IsEnum(TodoPriority, {
    each: false,
    message: `Priority must be either ${Object.values(TodoPriority).join(", ")}`,
  })
  priority!: TodoPriority;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsUUID()
  @IsNotEmpty()
  userId!: string;
}
