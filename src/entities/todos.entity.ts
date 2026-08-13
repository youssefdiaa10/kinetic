import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Todos extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  status!: "NEEDS_ACTION" | "COMPLETED";

  @Column()
  description!: string;

  @ManyToOne(() => User, (user) => user.todos, { onDelete: "CASCADE" })
  user!: User;
}
