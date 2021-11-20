const { db } = require("../config/db");
const jwt = require("jsonwebtoken");
const config = require("config");
const Todo = require('../models/todo.model')

const getTodos = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await db
      .from("todo")
      .select("*")
      .where("user_id", "=", userId);

    res.json({
      result,
      msg: "success",
    });
  } catch (err) {
    res.send(err.message);
  }
};

const getTodosMongo = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const result = await Todo.find({ user_id })
    res.json({
      result,
      msg: "success",
    });
  } catch (err) {
    res.send(err.message);
  }
};



const addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user_id = req.user.id;
    const result = await db("todo")
      .insert({
        title,
        description,
        user_id,
      })
      .returning("*");
    const id = result[0];
    res.json({
      msg: "successfully added",
      todo: {
        id,
        title,
        description,
        user_id,
      },
    });
  } catch (err) {
    res.send(err.message);
  }
};
const addTodoMongo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user_id = req.user.id;
    const newTodo = new Todo({
      title: title,
      description: description,
      user_id,
    });

    const todo = await newTodo.save();
    res.json({
      msg: "successfully added",
      todo: {
        _id: todo._id,
        title,
        description,
        user_id,
      },
    });
  } catch (err) {
    res.send(err.message);
  }
};

const deleteTodo = async (req, res) => {
  const id = req.body.id;
  const user_id = req.user.id;
  try {
    const result = await db("todo")
      .where({
        id,
        user_id,
      })
      .del();
    res.json(result);
  } catch (err) {
    res.send(err.message);
  }
};

const deleteTodoMongo = async (req, res) => {
  const _id = req.body._id;
  const user_id = req.user.id;
  try {
    const result = await Todo.findOneAndRemove({ _id, user_id })
    res.json(result);
  } catch (err) {
    res.send(err.message);
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id, title, description } = req.body;
    const user_id = req.user.id;
    const result = await db("todo")
      .where({
        id,
        user_id,
      })
      .update({
        title,
        description,
      });
    if (result === 0) {
      return res.status(401).send("UNAUTHORIZED!");
    }
    res.json({ msg: "updated successfully" });
  } catch (err) {
    res.send(err.message);
  }
};
const updateTodoMongo = async (req, res) => {
  try {
    const { _id, title, description } = req.body;
    const user_id = req.user.id;
    const result = await Todo.findOneAndUpdate({ _id, user_id }, { title, description })
    if (result === 0) {
      return res.status(401).send("UNAUTHORIZED!");
    }
    res.json({ msg: "updated successfully" });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

module.exports = {
  getTodos,
  getTodosMongo,
  addTodo,
  addTodoMongo,
  deleteTodo,
  deleteTodoMongo,
  updateTodo,
  updateTodoMongo
};
