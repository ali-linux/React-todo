const express = require("express");
const router = express.Router();
const todoController = require("../../controllers/todo.controller");
const todoValidator = require("../../validators/todoValidator");
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
router.post(
  "/add",
  auth,
  todoValidator.addTodValidator,
  todoController.addTodo
);

/*
@route api/todo/delete
@dec deletes todo
@access protected
*/
router.post("/delete", auth, todoController.deleteTodo);

/*
@route api/todo/update
@dec update todo
@access protected
*/
router.post(
  "/update",
  auth,
  todoValidator.updateTodoValidator,
  todoController.updateTodo
);

module.exports = router;
