const onlineUsers = new Map();

exports.addUser = (login, socket) => {
  return onlineUsers.set(login, socket);
};

exports.getUser = login => {
  return onlineUsers.get(login);
};

exports.removeUser = login => {
  return onlineUsers.delete(login);
};

exports.getOnlineUsers = () => {
  const users = [];
  for (socket of onlineUsers.values()) {
    users.push({
      login: socket.data.tokenPayload.login,
      textColor: socket.data.textColor
    });
  }
  return users;
};