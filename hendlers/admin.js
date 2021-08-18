const userService = require("../services/user");
const onlineUsers = require("../services/onlineUsers");

module.exports = (io, socket) => {
  socket.on("s:muteUser", async userId => {
    await userService.updateUser(userId, { isMuted: true });
    const userSocket = onlineUsers.getUser(userId);
    if (userSocket) {
      userSocket.data.restrictions.isMuted = true;
      userSocket.emit("c:userRestrictions", userSocket.data.restrictions);
      userSocket.emit("c:message", {
        text: "You are muted!",
        type: "info"
      });
    }
    io.in("admin").emit("c:allUsers", await userService.getAllUsers());
  });

  socket.on("s:unmuteUser", async userId => {
    await userService.updateUser(userId, { isMuted: false });
    const userSocket = onlineUsers.getUser(userId);
    if (userSocket) {
      userSocket.data.restrictions.isMuted = false;
      userSocket.emit("c:userRestrictions", userSocket.data.restrictions);
      userSocket.emit("c:message", {
        text: "You are unmuted!",
        type: "info"
      });
    }
    io.in("admin").emit("c:allUsers", await userService.getAllUsers());
  });

  socket.on("s:blockUser", async userId => {
    await userService.updateUser(userId, { isBlocked: true });
    const userSocket = onlineUsers.getUser(userId);
    if (userSocket) {
      userSocket.disconnect();
      onlineUsers.removeUser(userId);
      io.emit("c:onlineUsers", onlineUsers.getOnlineUsers());
    }
    io.in("admin").emit("c:allUsers", await userService.getAllUsers());
  });

  socket.on("s:unblockUser", async userId => {
    await userService.updateUser(userId, { isBlocked: false });
    io.in("admin").emit("c:allUsers", await userService.getAllUsers());
  });
};