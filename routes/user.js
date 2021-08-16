const express = require("express");

const authController = require("../controllers/user");

const router = express.Router();

router.post("/login", authController.login);

module.exports = router;
