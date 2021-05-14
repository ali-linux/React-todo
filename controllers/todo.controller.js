const { db } = require("../config/db");
const jwt = require("jsonwebtoken");
const config = require("config");

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

const addTodo = async (req, res) => {
  try {
    const { title, description, id } = req.body;
    const user_id = req.user.id;
    const result = await db("todo").insert({
      title,
      description,
      user_id,
    });
    res.json({
      msg: "successfully added",
      result,
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = {
  getTodos,
  addTodo,
};
