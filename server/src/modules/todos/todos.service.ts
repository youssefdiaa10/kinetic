import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  CreateTodosDto,
  DeleteTodosDto,
  FindAllTodosByUserIdDto,
  UpdateTodosDto,
} from "../../dtos/todos/todos.dto";
import { Todos } from "../../entities/todos.entity";
import { User } from "../../entities/user.entity";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private readonly todosRepository: Repository<Todos>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAllTodosByUserId(findAllTodosByUserIdDto: FindAllTodosByUserIdDto) {
    const user = await this.userRepository.find({
      where: {
        id: findAllTodosByUserIdDto.id,
      },
    });

    if (!user) throw new NotFoundException("User is not found!");

    const todos = await this.todosRepository.find({
      where: {
        user: {
          id: findAllTodosByUserIdDto.id,
        },
      },
    });

    return todos;
  }

  async findOne(id: string) {
    const todo = await this.todosRepository.findOne({
      where: {
        id,
      },
    });

    if (!todo) throw new NotFoundException("Todo is not found!");

    return todo;
  }

  async create(createTodosDto: CreateTodosDto) {
    const user = await this.userRepository.findOneBy({
      id: createTodosDto.userId,
    });

    if (!user) throw new NotFoundException("User is not found!");

    const newTodo = this.todosRepository.create({
      title: createTodosDto.title,
      status: createTodosDto.status,
      priority: createTodosDto.priority,
      description: createTodosDto.description,
      user: user,
    });

    return await this.todosRepository.save(newTodo);
  }

  async update(id: string, updateTodosDto: UpdateTodosDto) {
    const todo = await this.todosRepository.findOne({
      where: { id },
    });

    if (!todo) throw new NotFoundException("Todo is not found");

    const changesWithoutUndefined = Object.fromEntries(
      Object.entries(updateTodosDto).filter(([, value]) => value !== undefined),
    );

    this.todosRepository.merge(todo, changesWithoutUndefined);

    await this.todosRepository.save(todo);

    return {
      message: "Todo is updated successfully",
      todo,
    };
  }

  async delete(deleteTodosDto: DeleteTodosDto) {
    const todo = await this.todosRepository.findOne({
      where: {
        id: deleteTodosDto.id,
      },
    });

    if (!todo) throw new NotFoundException("Todo is not found");

    await this.todosRepository.remove(todo);

    return "Todo removed successfully";
  }
}
