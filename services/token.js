const jwt = require("jsonwebtoken");

const Token = require("../models/token.js");

exports.generateTokens = payload => {
  const acssessToken = jwt.sign(
    payload,
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    payload,
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: "7d" }
  );
  return {
    acssessToken,
    refreshToken
  };
};

exports.verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
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