const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/user");

const router = express.Router();

router.post(
  "/login",
  body("login")
  .isLength({ min: 3, max: 12 }).withMessage("Incorrect login")
  .matches(/^[A-Za-z0-9]+$/).withMessage("Incorrect login"),
  body("password")
  .isLength({ min: 4, max: 16 }).withMessage("Incorrect password"),
  authController.login);

module.exports = router;
