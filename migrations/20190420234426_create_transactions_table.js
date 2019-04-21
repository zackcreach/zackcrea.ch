exports.up = (knex, Promise) => {
  return Promise.all([
    knex.raw('create extension if not exists "uuid-ossp"'),
    knex.schema.createTable("transactions", table => {
      table.increments("id").primary();
      table.string("uuid").defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("source");
      table.string("user");
      table.string("title");
      table.string("category");
      table.boolean("reoccuring");
      table.float("budget", 10, 2);
      table.float("cost", 10, 2);
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.raw('drop extension if exists "uuid-ossp"'),
    knex.schema.dropTableIfExists("transactions")
  ]);
};
