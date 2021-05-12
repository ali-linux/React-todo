// Update with your config settings.

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      database: "todo_db",
      host: "localhost",
      user: "root",
      password: "",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
