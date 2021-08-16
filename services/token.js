const jwt = require("jsonwebtoken");

exports.generateToken = payload => {
  const token = jwt.sign(
    payload,
    process.env.TOKEN_SECRET_KEY,
    { expiresIn: "1h" }
  );
  return token;
};

exports.verifyToken = token => {
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  } catch (err) {
    return null;
  }
};