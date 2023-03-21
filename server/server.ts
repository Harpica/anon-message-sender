import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { WebSocket, WebSocketServer } from 'ws';
import { createUser, getAllUsers } from './controllers/user';
import prisma from './bd/prisma';
import {
    createMessage,
    getReceivedMessages,
    getSentMessages,
} from './controllers/message';

// Usage of .env file in the root dir
dotenv.config();

const app = express();

const PORT = process.env.APP_PORT || 5002;
const BASE_URL = process.env.BASE_URL || 'localhost';

const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/users', createUser);
app.get('/users', getAllUsers);

app.get('/messages/:id/sent', getSentMessages);
app.get('/messages/:id/received', getReceivedMessages);

const server = app.listen(PORT, () => {
    console.log('Listening to', PORT);
});

const wss = new WebSocketServer({ server });

const clients = new Map<WebSocket, { id: number; name?: string }>();

wss.on('connection', (ws: WebSocket) => {
    prisma.message.findMany().then((data) => console.log('messages: ', data));

    prisma.user.findMany().then((data) => console.log('users: ', data));

    ws.on('message', (message: Buffer) => {
        const data = JSON.parse(message.toString());
        if (data.type === 'init') {
            const id = data.id;
            const metadata = { id };
            clients.set(ws, metadata);
        } else {
            const metadata = clients.get(ws);
            data.sender = metadata?.id;

            const outbound = JSON.stringify(data);
            const recipient = [...clients.keys()].find((key) => {
                return clients.get(key)?.name === data.recipient;
            });

            createMessage(
                data.title,
                data.sender,
                data.recipient,
                data.recipientName
            )
                .then((message) => {
                    console.log(message);
                    recipient?.send(outbound);
                    ws.send(outbound);
                })
                .catch((err) => {
                    console.log(err);
                    ws.send('error', err.message);
                });
        }
    });
    ws.on('close', () => {
        clients.delete(ws);
    });
});
