import { Body, Controller, Patch, Post } from "@nestjs/common";
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
  signup(@Body() signup: SignupDto) {
    return this.authService.signup(signup);
  }

  @Post("/signin")
  signin(@Body() signin: SigninDto) {
    return this.authService.signin(signin);
  }

  @Patch("/verify")
  verify(@Body() verify: VerifyDto) {
    return this.authService.verify(verify);
  }

  @Post("/refresh")
  refresh(@Body() refresh: RefreshDto) {
    return this.authService.refresh(refresh.token);
  }
}
