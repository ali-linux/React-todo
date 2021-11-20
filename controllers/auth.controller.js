const { db } = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Auth = require('../models/auth.model')
//GET USER INFO

const getAuth = async (req, res) => {
  try {
    const user = await Auth.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
};

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

const loginMongo = async (req, res) => {
  const { email, password } = req.body;
  const b = req.body;
  try {
    // SEE IF USER EXISTS
    let user = await Auth.findOne({ email });
    if (!user)
      return res.status(400).json({
        errors: [
          {
            msg: "INVALID CREDENTIALS",
          },
        ],
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "INVALID CREDENTIALS" }] });
    } // RETURN JWT TOKEN
    const payload = {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
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
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const registerMongo = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // SEE IF USER EXISTS
    let user = await Auth.findOne({ email });
    if (user)
      return res.status(400).json({
        errors: [
          {
            msg: "user already exist",
          },
        ],
      });

    user = new Auth({
      name,
      email,
      password,
    });
    // ENCRYPT PASSWORD
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    // RETURN JSONWEBTOKEN

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// LOGIN
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
  getAuth,
  login,
  loginMongo,
  register,
  registerMongo,
  getUserInfo,
};
