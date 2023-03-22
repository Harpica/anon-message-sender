import { IncomingMessage, ServerResponse, Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { createMessage } from '../controllers/message';

interface InitData {
    type: 'init';
    id: number;
}

export interface MessageData {
    title: string;
    body: string;
    senderID: number;
    senderName: string;
    recipientID: number;
    recipientName: string;
}

const isInitData = (x: any): x is InitData => {
    return x.type === 'init';
};

export class Messenger {
    private wss: WebSocketServer;
    private clients: Map<WebSocket, { id: number }>;

    constructor(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
        this.wss = new WebSocketServer({ server });
        this.clients = new Map<WebSocket, { id: number }>();
    }

    start() {
        this.wss.on('connection', (client: WebSocket) => {
            client.on('message', (message: Buffer) => {
                this.handleWsMessade(message, client);
            });
            client.on('close', () => {
                this.clients.delete(client);
            });
        });
    }

    private handleWsMessade(message: Buffer, client: WebSocket) {
        const data = JSON.parse(message.toString()) as InitData | MessageData;
        if (isInitData(data)) {
            this.initClient(data, client);
        } else {
            this.sendMessage(data, client);
        }
    }

    private initClient(data: InitData, sender: WebSocket) {
        const id = data.id;
        const metadata = { id };
        this.clients.set(sender, metadata);
    }

    private sendMessage(data: MessageData, sender: WebSocket) {
        const recipient = [...this.clients.keys()].find((key) => {
            return this.clients.get(key)?.id === data.recipientID;
        });

        createMessage(data)
            .then((message) => {
                const outbound = JSON.stringify(message);
                if (recipient) {
                    recipient.send(outbound);
                }
                if (recipient !== sender) {
                    sender.send(outbound);
                }
            })
            .catch((err) => {
                console.log(err);
                sender.send(JSON.stringify({ error: err.message }));
            });
    }
}
