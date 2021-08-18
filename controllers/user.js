const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const User = require("../models/user.js");

const tokenService = require("../services/token");
const colorService = require("../services/color");

exports.login = async (req, res, next) => {
  try {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      throw new Error(validation.errors[0].msg);
    }
    const { login, password } = req.body;
    let user = await User.findOne({ login });
    if (!user) {
      const hashPassword = await bcrypt.hash(password, 10);
      const isAdmin = (await User.estimatedDocumentCount()) === 0;
      user = await User.create({
        login,
        password: hashPassword,
        isAdmin,
        color: colorService.getColor()
      });
    } else {
      const isPassEqual = await bcrypt.compare(password, user.password);
      if (!isPassEqual) {
        throw new Error("Incorrect password");
      }
    }
    const token = tokenService.generateToken({
      _id: user._id
    });
    return res.status(200).json({
      message: "Successful login",
      token
    });
  } catch (err) {
    next(err);
  }
};

exports.getUser