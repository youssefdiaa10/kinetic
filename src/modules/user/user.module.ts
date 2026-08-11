import { Module } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard],
})
export class UserModule {}
