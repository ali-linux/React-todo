const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");
const authValidator = require("../../validators/authValidator");
/*
  @route api/auth/login
  @access public
*/
router.post("/login", authController.login);

/*
  @route api/auth/register
  @access public
*/
router.post(
  "/register",
  authValidator.registerValidator,
  authController.register
);

module.exports = router;
