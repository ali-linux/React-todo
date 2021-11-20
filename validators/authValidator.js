const { check, validationResult } = require("express-validator");

const loginValidator = [
  check("email", "please include a valid email").isEmail(),
  check("password", "PASSWORD IS REQUIRED").exists(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const registerValidator = [
  check("name", "Name is required")
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 1 })
    .escape(),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email field is required")
    .isEmail()
    .withMessage("please include a valid email"),
  check("password")
    .not()
    .isEmpty()
    .escape()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("Please enter a password with 6 or more characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  registerValidator,
  loginValidator,
};
