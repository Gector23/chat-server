require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const app = require('./app');

const sequelize = require('./db');

const userService = require('./services/user');
const onlineUsersService = require('./services/onlineUsers');
const tokenService = require('./services/token');

const messageHandlers = require('./hendlers/message');
const adminHandlers = require('./hendlers/admin');

sequelize.sync().catch((err) => {
  console.log(err);
});

const PORT = process.env.PORT || 5000;
app.set('port', PORT);

const server = http.createServer(app);

const io = new Server(server, {
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
});

io.use(async (socket, next) => {
  const tokenPayload = tokenService.verifyToken(socket.handshake.auth.token);

  if (!tokenPayload) {
    socket.disconnect();
    return;
  }

  const userData = await userService.getUserData(tokenPayload._id);

  if (userData?.restrictions?.isBlocked) {
    socket.disconnect();
    return;
  }

  socket.data.tokenPayload = tokenPayload;
  socket.data.userData = userData;
  next();
});

io.on('connection', async (socket) => {
  messageHandlers(io, socket);

  if (socket.data.userData.restrictions.isAdmin) {
    adminHandlers(io, socket);
  }

  const prevSocket = onlineUsersService.getUser(socket.data.tokenPayload._id);

  if (prevSocket) {
    prevSocket.disconnect();
  }

  onlineUsersService.addUser(socket.data.tokenPayload._id, socket);
  socket.emit('c:userRestrictions', socket.data.userData.restrictions);

  if (socket.data.userData.restrictions.isAdmin) {
    socket.join('admin');
  }

  socket.broadcast.emit('c:message', {
    text: `${socket.data.userData.login} join to chat`,
    type: 'info',
  });

  io.emit('c:onlineUsers', onlineUsersService.getOnlineUsers());
  io.in('admin').emit('c:allUsers', await userService.getAllUsers());

  console.log(`${socket.data.userData.login} connected`);

  socket.on('disconnect', async () => {
    onlineUsersService.removeUser(socket.data.tokenPayload._id);

    if (socket.data.userData.restrictions.isAdmin) {
      socket.leave('admin');
    }

    socket.disconnect();
    socket.broadcast.emit('c:message', {
      text: `${socket.data.userData.login} left the chat`,
      type: 'info',
    });

    io.emit('c:onlineUsers', onlineUsersService.getOnlineUsers());

    console.log(`${socket.data.userData.login} disconnected`);
  });
});

server.on('error', (err) => {
  console.log(err);
});

server.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
