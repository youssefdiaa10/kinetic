import { OmitType, PartialType, PickType } from "@nestjs/mapped-types";
import { BaseTodosDto, BaseUserDto } from "../index.dto";

export class CreateTodosDto extends OmitType(BaseTodosDto, ["id"] as const) {}
export class UpdateTodosDto extends PartialType(
  OmitType(BaseTodosDto, ["userId", "id"] as const),
) {}

export class DeleteTodosDto extends PickType(BaseTodosDto, ["id"] as const) {}
export class FindAllTodosDto extends PickType(BaseUserDto, ["id"] as const) {}
