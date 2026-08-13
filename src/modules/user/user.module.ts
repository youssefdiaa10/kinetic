import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Todos } from "../../entities/todos.entity";
import { User } from "../../entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Todos])],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard],
})
export class UserModule {}
