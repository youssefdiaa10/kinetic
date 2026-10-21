import { OmitType } from "@nestjs/mapped-types";
import { BaseTokenDto, BaseUserDto } from "../index.dto";

export class SigninDto extends OmitType(BaseUserDto, [
  "username",
  "id",
] as const) {}
export class SignupDto extends OmitType(BaseUserDto, ["id"] as const) {}

export class VerifyDto extends BaseTokenDto {}
export class RefreshDto extends BaseTokenDto {}
