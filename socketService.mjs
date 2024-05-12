// socketService.mjs
import { Server } from 'socket.io';

function initializeSocket(server) {
    const io =  new Server(server, {
      cors: {
        origin: "*",  // Permite todos los orígenes
        methods: ["GET", "POST"]  // Métodos permitidos
      }
    });
    
    io.on('connection', socket => {
        console.log('WebSocket client connected');
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return io;
}

export default initializeSocket;
