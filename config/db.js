const knex = require("knex");
const knexfile = require("../knexfile");
const db = knex(knexfile.development);
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "todo_db",
// });

module.exports = {
  db,
};
