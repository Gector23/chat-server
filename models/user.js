const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  login: {type: String, unique: true, required: true, minLength: 3, maxLength: 12},
  password: {type: String, required: true},
  email: {type: String},
  isAdmin: {type: Boolean, default: false},
  isMuted: {type: Boolean, default: false},
  isBlocked: {type: Boolean, default: false},
  color: {type: String, require: true},
  lastMessageDate: {type: Date, default: null}
});

module.exports = mongoose.model("User", userSchema);