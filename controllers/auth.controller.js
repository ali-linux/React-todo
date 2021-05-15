const { db } = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//GET USER INFO

const getUserInfo = async (req, res, next) => {
  try {
    const result = await db
      .from("users")
      .select("*")
      .where("email", "=", req.user.email)
      .first();
    res.json(result);
  } catch (err) {
    res.send(err.message);
  }
};

//LOGIN
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await db
      .from("users")
      .select("*")
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
    }
    const payload = {
      user: {
        id: result.id,
        name: result.name,
        email: result.email,
      },
    };
    const userInfo = payload.user;
    jwt.sign(
      payload,
      config.get("jwtToken"),
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          userInfo,
        });
      }
    );
    // res.json({ result, msg: "they match " });
  } catch (err) {
    res.send(err.message);
  }
};

// REGISTER
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await db
      .select("email")
      .from("users")
      .where({ email })
      .first();
    if (userExist)
      return res.status(400).json({
        errors: [
          {
            msg: "user already exist with that email address",
          },
        ],
      });
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
  getUserInfo,
};
