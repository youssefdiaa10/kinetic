import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Todos } from "../../entities/todos.entity";
import { User } from "../../entities/user.entity";
import { TodosController } from "./todos.controller";
import { TodosService } from "./todos.service";

@Module({
  imports: [TypeOrmModule.forFeature([Todos, User])],
  controllers: [TodosController],
  providers: [TodosService, JwtAuthGuard],
})
export class TodosModule {}
