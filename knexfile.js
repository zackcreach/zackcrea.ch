require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: process.env.PG_CONNECTION,
    pool: {
      min: 1,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },
  staging: {
    client: "pg",
    connection: process.env.PG_CONNECTION,
    pool: {
      min: 1,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },
  production: {
    client: "pg",
    connection: process.env.PG_CONNECTION,
    pool: {
      min: 1,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
