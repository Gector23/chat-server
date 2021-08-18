require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const app = require("./app");

const userService = require("./services/user");
const onlineUsers = require("./services/onlineUsers");
const tokenService = require("./services/token");

const messageHandlers = require("./hendlers/message");
const adminHandlers = require("./hendlers/admin");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection to database failed");
  });

const PORT = process.env.PORT || 5000;
app.set("port", PORT);

const server = http.createServer(app);

const io = new Server(server, {
  transports: ["websocket"],
  cors: {
    origin: "*"
  }
});

io.use((socket, next) => {
  const tokenPayload = tokenService.verifyToken(socket.handshake.auth.token);
  if (!tokenPayload) {
    socket.disconnect();
    return;
  }
  socket.data.tokenPayload = tokenPayload;
  next();
});

io.use(async (socket, next) => {
  const userRestrictions = await userService.getUserRestrictions(socket.data.tokenPayload._id);
  if (userRestrictions.isBlocked) {
    socket.disconnect();
    return;
  }
  socket.data.restrictions = userRestrictions;
  next();
});

io.use(async (socket, next) => {
  const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  const colors = ["primary", "secondary", "error", "warning", "info", "success"];
  const shades = ["light", "main", "dark"];

  socket.data.textColor = {
    color: colors[randomInteger(0, 5)],
    shade: shades[randomInteger(0, 2)]
  };
  next();
});

io.on("connection", async socket => {
  messageHandlers(io, socket);
  if (socket.data.restrictions.isAdmin) {
    adminHandlers(io, socket);
  }

  const prevSocket = onlineUsers.getUser(socket.data.tokenPayload.login);
  if (prevSocket) {
    prevSocket.disconnect();
  }
  onlineUsers.addUser(socket.data.tokenPayload._id, socket);
  socket.emit("c:userRestrictions", socket.data.restrictions);
  if (socket.data.restrictions.isAdmin) {
    socket.join("admin");
  }
  socket.broadcast.emit("c:message", {
    text: `${socket.data.tokenPayload.login} join to chat`,
    type: "info"
  });
  io.emit("c:onlineUsers", onlineUsers.getOnlineUsers());
  io.in("admin").emit("c:allUsers", await userService.getAllUsers());

  console.log(`${socket.data.tokenPayload.login} connected`);

  socket.on("disconnect", async () => {
    onlineUsers.removeUser(socket.data.tokenPayload._id);
    if (socket.data.restrictions.isAdmin) {
      socket.leave("admin");
    }
    socket.disconnect();
    socket.broadcast.emit("c:message", {
      text: `${socket.data.tokenPayload.login} left the chat`,
      type: "info"
    });
    io.emit("c:onlineUsers", onlineUsers.getOnlineUsers());

    console.log(`${socket.data.tokenPayload.login} disconnected`);
  });
});

server.on("error", err => {
  console.log(err);
});

server.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});