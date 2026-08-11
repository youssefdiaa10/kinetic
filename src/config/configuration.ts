import { Todo } from "../entities/todos.entity";
import { User } from "../entities/user.entity";

const type: 'better-sqlite3' | undefined = 'better-sqlite3';

export default () => ({
    app: {
        port: process.env.PORT ?? 3000,
    },
    database: {
        sqlite3: {
            type,
            database: "database/db.sqlite",
            // entities: [join(__dirname, "../entities/**/*.entity{.ts,.js}")],
            entities: [User, Todo],
            synchronize: true, //!< ⚠️ true only in development
        }
    }
})