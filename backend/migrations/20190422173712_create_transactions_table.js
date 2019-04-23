exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable("transactions", table => {
      table
        .uuid("id")
        .notNullable()
        .primary();
      table.dateTime("created_at");
      table.dateTime("modified_at");
      table.string("source");
      table.string("merchant");
      table.string("user");
      table.string("title");
      table.string("category");
      table.string("subcategory");
      table.boolean("reoccuring");
      table.float("budget", 10, 2);
      table.float("cost", 10, 2);
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([knex.schema.dropTableIfExists("transactions")]);
};
