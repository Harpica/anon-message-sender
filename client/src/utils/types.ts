export interface UserData {
    id: number;
    name: string;
}

export interface MessageData {
    title: string;
    body: string;
    senderID: number;
    recipientID: number;
    recipientName?: string;
    senderName?: string;
}

export interface Message extends MessageData {
    id: number;
    date?: string;
}

export interface Messages {
    sent: Array<Message>;
    received: Array<Message>;
}
