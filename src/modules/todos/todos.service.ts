import { Injectable } from "@nestjs/common";

@Injectable()
export class TodosService {
  findAll() {
    return "Todos module";
  }
}
