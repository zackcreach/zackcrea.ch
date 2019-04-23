require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./backend/migrations"
    },
    seeds: {
      directory: "./backend/seeds"
    }
  },
  production: {
    client: "pg",
    connection: process.env.PG_CONNECTION,
    migrations: {
      tableName: "knex_migrations",
      directory: "./backend/migrations"
    }
  }
};
