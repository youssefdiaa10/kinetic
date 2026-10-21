import { PickType } from "@nestjs/mapped-types";
import { BaseUserDto } from "../index.dto";

export class FindOneUserDto extends PickType(BaseUserDto, ["email"]) {}
