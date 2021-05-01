import { app } from './app';
import { Server } from 'http';

import { getManager } from 'typeorm';
import { Socket } from 'socket.io';

const httpServer = new Server(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

async function getMessages() {
  const entityManager = getManager();
  const messages = entityManager.query(`SELECT U.name as sender, M.content
                                         FROM users AS U INNER JOIN messages AS M
                                         ON M.sender = U.id`);
  return messages;
}

io.use((socket, next) => {
  const name = socket.handshake.auth.name;
  socket.name = name;
  next();
});

io.on('connection', (socket: Socket) => {
  console.log(`Socket connected, ID: ${socket.id}`);
  io.sockets.sockets['name'] = socket.name;
  io.sockets.sockets['id'] = socket.id;

  const users = [];

  io.sockets.sockets.forEach((socket) => {
    users.push({
      userID: socket.id,
      name: socket.name,
    });
  });

  socket.emit('users', users);

  socket.broadcast.emit('userConnected', {
    userID: socket.id,
    name: socket.name,
  });
  getMessages().then((messages) => socket.emit('previousMessages', messages));
});

httpServer.listen(3333, () => console.log('Leaf-Back-End is running!'));
