import { AuthModule } from "./auth/auth.module";
import { TodosModule } from "./todos/todos.module";
import { UserModule } from "./user/user.module";

const modules = [AuthModule, UserModule, TodosModule];

export default modules;
