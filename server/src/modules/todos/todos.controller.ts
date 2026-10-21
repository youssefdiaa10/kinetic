import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import {
  CreateTodosDto,
  DeleteTodosDto,
  FindAllTodosDto,
  UpdateTodosDto,
} from "../../dtos/todos/todos.dto";
import { TodosService } from "./todos.service";

@Controller("todos")
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get("/all")
  findAll(@Body() findAllTodosDto: FindAllTodosDto) {
    return this.todosService.findAll(findAllTodosDto);
  }

  @Get("/one")
  findOne(@Body() id: string) {
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
