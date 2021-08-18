const gravatar = require("gravatar");

const onlineUsers = new Map();

exports.addUser = (userId, socket) => {
  return onlineUsers.set(userId, socket);
};

exports.getUser = userId => {
  return onlineUsers.get(userId);
};

exports.removeUser = userId => {
  return onlineUsers.delete(userId);
};

exports.getOnlineUsers = () => {
  const users = [];
  for (socket of onlineUsers.values()) {
    users.push({
      login: socket.data.userData.login,
      color: socket.data.userData.color,
      avatar: gravatar.url(socket.data.userData.email)
    });
  }
  return users;
};