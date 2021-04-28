import { app } from './app';
import { Server } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import { getManager } from 'typeorm';

const httpServer = new Server(app);
const io = new SocketServer(httpServer);

async function getMessages() {
    const entityManager = getManager();
    const messages = entityManager.query(`SELECT U.name as sender, M.content
                                         FROM users AS U INNER JOIN messages AS M
                                         ON M.sender = U.id`);
    return messages;
}

io.on('connection', (socket: Socket) => {
    console.log(`Socket connected, ID: ${socket.id}`);

    getMessages().then((messages) => socket.emit('previousMessages', messages));

    socket.on('sendMessage', (data) => {
        socket.broadcast.emit('receivedMessage', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected!');
    });
});

httpServer.listen(3333, () => console.log('Leaf-Back-End is running!'));
