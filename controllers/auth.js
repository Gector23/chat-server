const bcrypt = require("bcrypt");

const User = require("../models/user.js");

const tokenServise = require("../services/token");

exports.login = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    let user = await User.findOne({ login });
    if (!user) {
      const hashPassword = await bcrypt.hash(password, 10);
      const isAdmin = (await User.estimatedDocumentCount()) === 0;
      user = await User.create({
        login,
        password: hashPassword,
        isAdmin
      });
    } else {
      const isPassEqual = await bcrypt.compare(password, user.password);
      if (!isPassEqual) {
        throw new Error("Incorrect password");
      }
    }
    const tokens = tokenServise.generateTokens({
      login: user.login,
      isAdmin: user.isAdmin
    });
    await tokenServise.saveRefreshToken(user._id, tokens.refreshToken);
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });
    return res.status(200).json({
      message: "Successful login",
      accessToken: tokens.acssessToken,
      user: {
        _id: user._id,
        login: user.login,
        isAdmin: user.isAdmin,
        isMuted: user.isMuted,
        isBlocked: user.isBlocked
      }
    });
  } catch (err) {
    next(err);
  }
};