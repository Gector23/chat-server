const userService = require("../services/user");

module.exports = (io, socket) => {
  socket.on("s:message", async text => {
    if (socket.data.userData.restrictions.isMuted) {
      socket.emit("c:message", {
        text: "You are muted!",
        type: "info"
      });
      return;
    }

    if (text.length > 200) {
      socket.emit("c:message", {
        text: "Message max length is 200",
        type: "info"
      });
      return;
    }

    const messageDate = Date.now();

    if (messageDate < +socket.data.userData.lastMessageDate + 1000 * 15) {
      socket.emit("c:message", {
        text: "Interval between messages 15s",
        type: "info"
      });
      return;
    }

    userService.updateUser(socket.data.tokenPayload._id, { lastMessageDate: messageDate })
    socket.data.userData.lastMessageDate = messageDate;

    io.emit("c:message", {
      author: socket.data.userData.login,
      text,
      date: messageDate,
      type: "message",
      color: socket.data.userData.color
    });
  });
};