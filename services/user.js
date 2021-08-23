const gravatar = require('gravatar');

const User = require('../models/user');

exports.getUserData = async (_id) => {
  const user = await User.findById(
    _id,
    'login email isAdmin isMuted isBlocked lastMessageDate color',
  );

  return {
    login: user.login,
    email: user.email,
    avatar: gravatar.url(user.email),
    lastMessageDate: user.lastMessageDate,
    color: user.color,
    restrictions: {
      isAdmin: user.isAdmin,
      isMuted: user.isMuted,
      isBlocked: user.isBlocked,
    },
  };
};

exports.getAllUsers = async () => {
  const users = await User.find({}, 'login email isAdmin isMuted isBlocked lastMessageDate color');

  return users.map((user) => ({
    _id: user._id,
    login: user.login,
    lastMessageDate: user.lastMessageDate,
    color: user.color,
    isAdmin: user.isAdmin,
    isMuted: user.isMuted,
    isBlocked: user.isBlocked,
    email: user.email,
    avatar: gravatar.url(user.email),
  }));
};

exports.updateUser = async (_id, update) => User.findByIdAndUpdate(_id, update);
