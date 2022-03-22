import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { Server } from 'socket.io';
import { blink } from './consoleeffevts';
import colors from 'ansi-colors';

const PORT = process.env.PORT || 8080;
const ISDEV = process.env.NODE_ENV !== 'production';

const app = express();

// start listening
app.listen(PORT, () => {
    console.log(`   Server running at port: ${blink(colors.green.underline(PORT + ""))} at ${new Date().toLocaleString()} as ${(colors.green(ISDEV ? "development" : "production"))} mode`);
});

// listen on /
app.get('/', (req, res) => {
    res.send({
    });
});

// make a socket server
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();

// listen to sockets on connection
io.on('connection', (socket) => {
    console.log('A user connected: ', socket.id);

    // listen to message event
    socket.on('message', (message: string) => {
        console.log(message);
    });

    // listen to disconnect event
    socket.on('disconnect', () => {
        console.log('A user disconnected: ', socket.id);
    });
});