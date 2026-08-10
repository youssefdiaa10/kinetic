import { IsString } from "class-validator";

export class TodosDto {
    @IsString()
    title!:string;
    
    status!: "NEEDS_ACTION" | "COMPLETED"
    
    @IsString()
    description!: string;
}