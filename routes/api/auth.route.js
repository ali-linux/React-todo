const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");
/*
  @route api/auth/login
  @access public
*/
router.post("/login", authController.login);

/*
  @route api/auth/register
  @access public
*/
router.post("/register", authController.register);

module.exports = router;
