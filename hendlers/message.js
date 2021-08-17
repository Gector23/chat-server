const userService = require("../services/user");

module.exports = (io, socket) => {
  socket.on("s:message", async text => {
    if (socket.data.restrictions.isMuted) {
      socket.emit("c:message", {
        text: "You are muted!",
        type: "info"
      });
      return;
    }

    const messageDate = Date.now();

    if (messageDate < +socket.data.restrictions.lastMessageDate + 1000 * 15) {
      socket.emit("c:message", {
        text: "Interval between messages 15s",
        type: "info"
      });
      return;
    }

    userService.updateUser(socket.data.tokenPayload.login, { lastMessageDate: messageDate })
    socket.data.restrictions.lastMessageDate = messageDate;

    io.emit("c:message", {
      login: socket.data.tokenPayload.login,
      text,
      date: messageDate,
      type: "message",
      textColor: socket.data.textColor
    });
  });
};