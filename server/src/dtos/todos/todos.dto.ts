import { OmitType, PartialType, PickType } from "@nestjs/mapped-types";
import { IsOptional, IsString } from "class-validator";
import { BaseTodosDto, BaseUserDto } from "../index.dto";

export class CreateTodosDto extends OmitType(BaseTodosDto, [
  "id",
  "description",
] as const) {
  @IsOptional()
  @IsString()
  description?: string;
}
export class UpdateTodosDto extends PartialType(
  OmitType(BaseTodosDto, ["userId", "id"] as const),
) {}

export class DeleteTodosDto extends PickType(BaseTodosDto, ["id"] as const) {}
export class FindAllTodosByUserIdDto extends PickType(BaseUserDto, [
  "id",
] as const) {}
