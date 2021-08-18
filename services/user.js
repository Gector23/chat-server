const User = require("../models/user");

exports.getUserData = async _id => {
  const user = await User.findById(_id, "login isAdmin isMuted isBlocked lastMessageDate color");
  return {
    login: user.login,
    lastMessageDate: user.lastMessageDate,
    color:  user.color,
    restrictions: {
      isAdmin: user.isAdmin,
      isMuted: user.isMuted,
      isBlocked: user.isBlocked
    }
  };
};

exports.getAllUsers = async () => {
  return User.find({}, "login isAdmin isMuted isBlocked lastMessageDate color");
};

exports.updateUser = async (_id, update) => {
  return User.findByIdAndUpdate(_id, update);
}