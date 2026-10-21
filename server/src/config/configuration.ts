export default () => ({
  app: {
    port: process.env.PORT || 3000,
  },
  database: {
    sqlite3: {
      type: "better-sqlite3",
      database: process.env.DB_PATH || "database/db.sqlite",
      //! ⚠️ Automatically disables synchronize in production
      synchronize: process.env.NODE_ENV !== "production",
    },
    postgres: {
      type: "postgres" as const,
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME || "todo_user",
      password: process.env.DB_PASSWORD || "todo_pass",
      database: process.env.DB_NAME || "todo_db",
      //! ⚠️ Automatically disables synchronize in production
      synchronize: process.env.NODE_ENV !== "production",
    },
  },
});
