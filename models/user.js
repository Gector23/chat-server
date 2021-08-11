const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  login: {type: String, unique: true, required: true, minLength: 3, maxLength: 12},
  password: {type: String, required: true},
  isAdmin: {type: Boolean, default: false},
  isMuted: {type: Boolean, default: false},
  isBlocked: {type: Boolean, default: false}
});

module.exports = mongoose.model("User", userSchema);