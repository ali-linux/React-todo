const express = require("express");

const login = (req, res, next) => {
  res.json("login works");
};

const register = (req, res, next) => {
  res.json("register works");
};

module.exports = {
  login,
  register,
};
