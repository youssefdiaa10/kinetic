import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RefreshToken } from "./refresh-token.entity";
import { Todos } from "./todos.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshTokens!: Array<RefreshToken>;

  @OneToMany(() => Todos, (todo) => todo.user)
  todos!: Array<Todos>;
}
