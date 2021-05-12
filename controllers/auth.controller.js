const express = require("express");
const { db } = require("../config/db");
const knex = require("knex");

const login = (req, res, next) => {
  db.select("email", "first_name", "last_name")
    .from("person")
    .then((rows) => {
      const data = rows.map((row) => {
        return { ...row, emails: "ali" };
      });
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const register = (req, res, next) => {
  res.json("register works");
};

module.exports = {
  login,
  register,
};
