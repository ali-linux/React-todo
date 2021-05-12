exports.up = function (knex) {
  return knex.schema.createTable("test", (table) => {
    table.increments("id");
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("phone").notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("test");
};
