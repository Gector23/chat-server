const jwt = require("jsonwebtoken");

const Token = require("../models/token.js");

exports.generateTokens = payload => {
  const acssessToken = jwt.sign(
    payload,
    "ACCESS_SECRET",
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    payload,
    "REFRESH_SECRET",
    { expiresIn: "7d" }
  );
  return {
    acssessToken,
    refreshToken
  };
};

exports.verifyToken = (token, tokenType) => {
  try {
    if (tokenType = "access") {
      return jwt.verify(token, "ACCESS_SECRET");
    } else if (tokenType = "refresh") {
      return jwt.verify(token, "REFRESH_SECRET");
    }
  } catch (err) {
    return null;
  }
};

exports.saveRefreshToken = async (user, refreshToken) => {
  const token = await Token.findOne({ user });
  if (token) {
    token.refreshToken = refreshToken;
    return await token.save();
  } else {
    return Token.create({ user, refreshToken });
  }
};