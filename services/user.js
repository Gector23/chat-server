const gravatar = require('gravatar');

const User = require('../models/user');

const colorService = require('./color');

exports.createUser = (login, password, email) => (
  User.create({
    login,
    password,
    email,
    color: colorService.getColor(),
  })
);

exports.findUser = (email) => (
  User.findOne({
    where: {
      email,
    },
  })
);

exports.getUserData = async (id) => {
  const user = await User.findByPk(id);

  return {
    login: user.login,
    email: user.email,
    avatar: gravatar.url(user.email),
    color: user.color,
    restrictions: {
      isAdmin: user.isAdmin,
      isMuted: user.isMuted,
      isBlocked: user.isBlocked,
    },
  };
};

exports.getAllUsers = async () => {
  const users = await User.findAll();

  return users.map((user) => ({
    id: user.id,
    login: user.login,
    color: user.color,
    isAdmin: user.isAdmin,
    isMuted: user.isMuted,
    isBlocked: user.isBlocked,
    email: user.email,
    avatar: gravatar.url(user.email),
  }));
};

exports.updateUser = async (id, update) => User.update(update, {
  where: {
    id,
  },
});
