import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { UserService } from "./user.service";

@Controller("user")
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@Request() request) {
    return this.userService.getUser();
    // return request
  }
}
