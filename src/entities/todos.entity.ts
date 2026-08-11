import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;

    @Column()
    status!: "NEEDS_ACTION" | "COMPLETED"

    @Column()
    description!: string;

}