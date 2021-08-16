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
  const tokensData = [];
  for (socket of onlineUsers.values()) {
    tokensData.push(socket.data.tokenPayload);
  }
  return tokensData;
};