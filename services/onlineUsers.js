const onlineUsers = new Map();

exports.addUser = (userId, socket) => onlineUsers.set(userId, socket);

exports.getUser = (userId) => onlineUsers.get(userId);

exports.removeUser = (userId) => onlineUsers.delete(userId);

exports.getOnlineUsers = () => {
  const users = [];
  for (const socket of onlineUsers.values()) {
    users.push({
      login: socket.data.userData.login,
      color: socket.data.userData.color,
      avatar: socket.data.userData.avatar,
    });
  }
  return users;
};
