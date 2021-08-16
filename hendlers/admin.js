const userService = require("../services/user");
const onlineUsers = require("../services/onlineUsers");

module.exports = (io, socket) => {
  socket.on("s:muteUser", async userLogin => {

    await userService.updateUser(userLogin, { isMuted: true });
    const userSocket = onlineUsers.getUser(userLogin);
    userSocket.data.restrictions.isMuted = true;
    if (userSocket) {
      userSocket.emit("c:userRestrictions", userSocket.data.restrictions);
      userSocket.emit("c:info", "You are muted!");
    }
    io.in("admin").emit("c:allUsers", await userService.getAllUsers());
  });

  socket.on("s:unmuteUser", async userLogin => {
    await userService.updateUser(userLogin, { isMuted: false });
    const userSocket = onlineUsers.getUser(userLogin);
    userSocket.data.restrictions.isMuted = false;
    if (userSocket) {
      userSocket.emit("c:userRestrictions", userSocket.data.restrictions);
      userSocket.emit("c:info", "You are unmuted!");
    }
    io.in("admin").emit("c:allUsers", await userService.getAllUsers());
  });

  socket.on("s:blockUser", async userLogin => {
    await userService.updateUser(userLogin, { isBlocked: true });
    const userSocket = onlineUsers.getUser(userLogin);
    if (userSocket) {
      userSocket.disconnect();
      onlineUsers.removeUser(userLogin);
      io.emit("c:onlineUsers", onlineUsers.getOnlineUsers());
    }
    io.in("admin").emit("c:allUsers", await userService.getAllUsers());
  });

  socket.on("s:unblockUser", async userLogin => {
    await userService.updateUser(userLogin, { isBlocked: false });
    io.in("admin").emit("c:allUsers", await userService.getAllUsers());
  });
};