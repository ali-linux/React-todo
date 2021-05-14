const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");
const authValidator = require("../../validators/authValidator");
const auth = require("../../middlewares/auth.middleware");
/*
  @route api/auth/login
  @access public
*/
router.post("/login", authController.login);

router.get("/user", auth, authController.getUserInfo);
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
