import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TodoPriority, TodoStatus } from "../enum/todos.enum";
import { User } from "./user.entity";

@Entity()
export class Todos extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column({
    type: "simple-enum",
    enum: TodoStatus,
    default: TodoStatus.NEEDS_ACTION,
  })
  status!: TodoStatus;

  @Column({
    type: "simple-enum",
    enum: TodoPriority,
    default: TodoPriority.MEDIUM,
  })
  priority!: TodoPriority;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => User, (user) => user.todos, { onDelete: "CASCADE" })
  user!: User;
}
