const User = require("../models/user");

exports.getUserRestrictions = async _id => {
  return User.findById(_id, "isAdmin isMuted isBlocked lastMessageDate");
};

exports.getAllUsers = async () => {
  return User.find({}, "login isAdmin isMuted isBlocked");
};

exports.updateUser = async (_id, update) => {
  return User.findByIdAndUpdate(_id, update);
}