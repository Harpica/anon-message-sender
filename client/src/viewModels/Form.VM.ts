import { makeAutoObservable } from 'mobx';
import { MessageData, UserData } from '../utils/types';

export class FormVM {
    private sendMessage: (message: MessageData) => void;
    private currentUser: UserData;
    private users: Array<UserData>;
    public isMessageShown: boolean;
    constructor(
        sendMessage: (message: MessageData) => void,
        currentUser: UserData,
        users: Array<UserData>
    ) {
        this.sendMessage = sendMessage;
        this.currentUser = currentUser;
        this.users = users;
        this.isMessageShown = false;
        makeAutoObservable(this);
    }

    handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const recipientName = (
            e.currentTarget.elements.namedItem('repicient') as HTMLInputElement
        ).value;
        const title = (
            e.currentTarget.elements.namedItem('title') as HTMLInputElement
        ).value;
        const body = (
            e.currentTarget.elements.namedItem('body') as HTMLTextAreaElement
        ).value;
        const recipientID =
            this.users.find((user) => user.name === recipientName)?.id ?? 0;
        this.sendMessage({
            title: title,
            body: body,
            recipientName: recipientName,
            recipientID: recipientID,
            senderID: this.currentUser.id,
            senderName: this.currentUser.name,
        });
        e.currentTarget.reset();
    }
    set setIsMessageShown(value: boolean) {
        this.isMessageShown = value;
    }
}
