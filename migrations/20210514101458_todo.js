exports.up = function (knex) {
  return knex.schema.createTable("todo", (table) => {
    table.increments("id");
    table.string("title").notNullable();
    table.string("description", 1000);
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("users.id");
  });
};

exports.down = function (knex) {
  knex.schema.dropTableIfExists("todo");
};
