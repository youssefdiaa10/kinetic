import { Body, Controller, Patch, Post, ValidationPipe } from "@nestjs/common";
import { Public } from "../../auth/decorators/public.decorator";
import {
  RefreshDto,
  SigninDto,
  SignupDto,
  VerifyDto,
} from "../../dtos/auth/auth.dto";
import { AuthService } from "./auth.service";

@Public()
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  signup(@Body(ValidationPipe) signup: SignupDto) {
    return this.authService.signup(signup);
  }

  @Patch("/signin")
  signin(@Body(ValidationPipe) signin: SigninDto) {
    return this.authService.signin(signin);
  }

  @Patch("/verify")
  verify(@Body(ValidationPipe) verify: VerifyDto) {
    return this.authService.verify(verify);
  }

  @Post("/refresh")
  refresh(@Body(ValidationPipe) refresh: RefreshDto) {
    return this.authService.refresh(refresh.token);
  }
}
