const { check, validationResult } = require("express-validator");

const addTodValidator = [
  check("title", "title is required").not().isEmpty().escape(),
  check("description").escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const updateTodoValidator = [
  check("id", "id is required").not().isEmpty().isNumeric(),
  check("title", "title is required").not().isEmpty().escape(),
  check("description").escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
module.exports = {
  addTodValidator,
  updateTodoValidator,
};
