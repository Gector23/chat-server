const userService = require("../services/user");
const onlineUsersService = require("../services/onlineUsers");

module.exports = (io, socket) => {
  socket.on("s:muteUser", async userId => {
    await userService.updateUser(userId, { isMuted: true });
    const userSocket = onlineUsersService.getUser(userId);
    if (userSocket) {
      userSocket.data.userData.restrictions.isMuted = true;
      userSocket.emit("c:userRestrictions", userSocket.data.userData.restrictions);
      userSocket.emit("c:message", {
        text: "You are muted!",
        type: "info"
      });
    }
    io.in("admin").emit("c:allUsers", await userService.getAllUsers());
  });

  socket.on("s:unmuteUser", async userId => {
    await userService.updateUser(userId, { isMuted: false });
    const userSocket = onlineUsersService.getUser(userId);
    if (userSocket) {
      userSocket.data.userData.restrictions.isMuted = false;
      userSocket.emit("c:userRestrictions", userSocket.data.userData.restrictions);
      userSocket.emit("c:message", {
        text: "You are unmuted!",
        type: "info"
      });
    }
    io.in("admin").emit("c:allUsers", await userService.getAllUsers());
  });

  socket.on("s:blockUser", async userId => {
    await userService.updateUser(userId, { isBlocked: true });
    const userSocket = onlineUsersService.getUser(userId);
    if (userSocket) {
      userSocket.disconnect();
      onlineUsersService.removeUser(userId);
    }
    io.in("admin").emit("c:allUsers", await userService.getAllUsers());
  });

  socket.on("s:unblockUser", async userId => {
    await userService.updateUser(userId, { isBlocked: false });
    io.in("admin").emit("c:allUsers", await userService.getAllUsers());
  });
};