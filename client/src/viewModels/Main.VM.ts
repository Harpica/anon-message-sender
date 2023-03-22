import { Api } from '../utils/API';
import { BASE_URL } from '../utils/constants';
import { Message, MessageData, Messages, UserData } from '../utils/types';
import { action, makeAutoObservable } from 'mobx';

export class MainVM {
    public ws: WebSocket | null = null;
    public users: Array<UserData> = [];
    public messages: Messages = { sent: [], received: [] };
    public isNotificationOpen: boolean;
    public notificationMessage: string;
    private currentUser: UserData;
    private setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    private api: Api;
    constructor(
        currentUser: UserData,
        setIsAuth: React.Dispatch<React.SetStateAction<boolean>>,
        api: Api
    ) {
        this.currentUser = currentUser;
        this.setIsAuth = setIsAuth;
        this.api = api;
        this.sendMessage = this.sendMessage.bind(this);
        this.getAllUsers();
        this.getAllMessages();
        this.isNotificationOpen = false;
        this.notificationMessage = '';
        makeAutoObservable(this);
    }
    getAllUsers() {
        this.api
            .getUsers()
            .then(
                action('fetchSuccess', (users) => {
                    this.users = users.data;
                })
            )
            .catch(action('fetchError', (err) => console.log(err)));
    }

    getAllMessages() {
        this.api
            .getReceivedMessages(this.currentUser.id.toString())
            .then(
                action('fetchSuccess', (data) => {
                    this.messages.received = data.data.messages;
                    this.messages.received.forEach((message) => {
                        message.senderName = this.users.find(
                            (user) => user.id === message.senderID
                        )?.name;
                    });
                })
            )
            .catch(action('fetchError', (err) => console.log(err)));
        this.api
            .getSentMessages(this.currentUser.id.toString())
            .then(
                action('fetchSuccess', (data) => {
                    this.messages.sent = data.data.messages;
                    this.messages.sent.forEach((message) => {
                        message.recipientName = this.users.find(
                            (user) => user.id === message.recipientID
                        )?.name;
                    });
                })
            )
            .catch(action('fetchError', (err) => console.log(err)));
    }

    setWSConnection() {
        this.ws = new WebSocket(`ws://${BASE_URL}`);
        this.sendInitMessage();
        this.listenToMessages();
    }

    closeWSConnection() {
        this.ws!.close();
    }

    private sendInitMessage() {
        this.ws!.onopen = () => {
            console.log('connected');
            const data = JSON.stringify({
                type: 'init',
                id: this.currentUser.id,
            });
            this.ws!.send(data);
        };
    }
    private listenToMessages() {
        this.ws!.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.error) {
                this.setNotificationMessage = 'Sorry, something went wrong :(';
            } else {
                if (data.senderID === this.currentUser.id) {
                    this.setSentMessage = data;
                    this.setNotificationMessage = 'Message is sent';
                }
                if (data.recipientID === this.currentUser.id) {
                    this.setReceivedMessage = data;
                    this.setNotificationMessage = 'You get new message!';
                }
            }
            this.setIsNotificationOpen = true;
        };
    }

    sendMessage(message: MessageData) {
        const data = JSON.stringify(message);
        this.ws!.send(data);
    }

    private set setReceivedMessage(message: Message) {
        this.messages.received = [...this.messages.received, message];
    }
    private set setSentMessage(message: Message) {
        this.messages.sent = [...this.messages.sent, message];
    }

    set setIsNotificationOpen(value: boolean) {
        this.isNotificationOpen = value;
    }
    private set setNotificationMessage(value: string) {
        this.notificationMessage = value;
    }

    logOut() {
        this.setIsAuth(false);
        this.closeWSConnection();
    }
}
