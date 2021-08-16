const userService = require("../services/user");

module.exports = (io, socket) => {
  socket.on("s:message", async text => {
    if (socket.data.restrictions.isMuted) {
      socket.emit("c:info", "You are muted!");
      return;
    }

    const messageDate = Date.now();

    if (messageDate < +socket.data.restrictions.lastMessageDate + 1000 * 15) {
      socket.emit("c:info", "Interval between messages 15s");
      return;
    }

    userService.updateUser(socket.data.tokenPayload.login, { lastMessageDate: messageDate })
    socket.data.restrictions.lastMessageDate = messageDate;

    io.emit("c:message", {
      login: socket.data.tokenPayload.login,
      text,
      date: messageDate
    });
  });
};