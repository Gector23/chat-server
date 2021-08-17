const User = require("../models/user");

exports.getUserRestrictions = async login => {
  return User.findOne({ login }, "isAdmin isMuted isBlocked lastMessageDate");
};

exports.getAllUsers = async () => {
  return User.find({}, "login isAdmin isMuted isBlocked");
};

exports.updateUser = async (login, update) => {
  return User.updateOne({ login }, update);
}