import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import {
  CreateTodosDto,
  DeleteTodosDto,
  FindAllTodosByUserIdDto,
  UpdateTodosDto,
} from "../../dtos/todos/todos.dto";
import { TodosService } from "./todos.service";

@Controller("todos")
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get("/all")
  findAllTodosByUserId(
    @Query() findAllTodosByUserIdDto: FindAllTodosByUserIdDto,
  ) {
    return this.todosService.findAllTodosByUserId(findAllTodosByUserIdDto);
  }

  @Get("/one")
  findOne(@Query("id", ParseUUIDPipe) id: string) {
    return this.todosService.findOne(id);
  }

  @Post("/create")
  create(@Body() createTodosDto: CreateTodosDto) {
    return this.todosService.create(createTodosDto);
  }

  @Patch("/update/:id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateTodosDto: UpdateTodosDto,
  ) {
    return this.todosService.update(id, updateTodosDto);
  }

  @Delete("/delete")
  delete(@Body() deleteTodosDto: DeleteTodosDto) {
    return this.todosService.delete(deleteTodosDto);
  }
}
