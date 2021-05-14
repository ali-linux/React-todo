const express = require("express");
const { db } = require("../config/db");
const knex = require("knex");
const bcrypt = require("bcryptjs");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await db
      .from("users")
      .select("email", "password")
      .where("email", "=", email)
      .first();
    if (!result)
      return res.status(400).json({
        errors: [
          {
            msg: "INVALID CREDENTIALS",
          },
        ],
      });
    const isMatch = await bcrypt.compare(password, result.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "INVALID CREDENTIALS" }] });
    } else {
      res.json({ result, msg: "they match " });
    }
  } catch (err) {
    res.send(err.message);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const result = await db("users").insert({
      name,
      email,
      password: encryptedPassword,
    });
    res.json({
      msg: "succesfully registeed",
      result,
    });
  } catch (err) {
    res.json(err.message);
  }
};

module.exports = {
  login,
  register,
};
