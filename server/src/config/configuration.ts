export default () => ({
  app: {
    port: process.env.PORT || 3001,
  },
  database: {
    sqlite3: {
      type: "better-sqlite3",
      database: process.env.DB_PATH || "database/db.sqlite",
      //! ⚠️ Automatically disables synchronize in production
      //! Keep schema synchronization enabled only during development.
      synchronize: process.env.NODE_ENV === "development",
    },
    postgres: {
      type: "postgres" as const,
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5433,
      username: process.env.DB_USERNAME || "yosofalwakil",
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "kinetic",

      // Opt in only when a single development instance must create or update the schema.
      synchronize: process.env.DB_SYNCHRONIZE === "true",
    },
  },
});
