const User = require("../models/user");

exports.getUserRestrictions = async login => {
  return await User.findOne({ login }, "isAdmin isMuted isBlocked lastMessageDate");
};

exports.getAllUsers = async () => {
  return await User.find({}, "login isAdmin isMuted isBlocked");
};

exports.updateUser = async (login, update) => {
  return await User.updateOne({ login }, update);
}