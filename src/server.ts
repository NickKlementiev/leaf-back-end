import { app } from './app';
import { Server } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

const httpServer = new Server(app);
const io = new SocketServer(httpServer);

io.on('connection', (socket: Socket) => {
    console.log('A user connected!');
    socket.on('disconnect', () => {
        console.log("User disconnected!");
    });
    socket.on('clicked', () => {
        console.log("Clicked!");
    });
});

httpServer.listen(3333, () => console.log('Leaf-Back-End is running!'));
