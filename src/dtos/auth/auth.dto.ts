import { BaseUserDto, Token } from "..";

export class SigninDto extends BaseUserDto {}
export class SignupDto extends BaseUserDto {}

export class VerifyDto extends Token {}
export class RefreshDto extends Token {}
