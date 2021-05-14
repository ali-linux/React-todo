const express = require("express");
const router = express.Router();
const todoController = require("../../controllers/todo.controller");
// const todoValidator = require("../../validators/todoValidator");
const auth = require("../../middlewares/auth.middleware");

/*
  @route api/todo/
  @dec retrives list of todos
  @access protected
*/
router.get("/", auth, todoController.getTodos);

/*
  @route api/todo/add
  @dec adds todo
  @access protected
*/

router.post("/add", auth, todoController.addTodo);
module.exports = router;
