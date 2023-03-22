import axios from 'axios';
import { BASE_URL } from './constants';

export class Api {
    constructor() {}

    getUsers() {
        return axios.get(`http://${BASE_URL}/users`);
    }

    loginUser(name: string) {
        return axios.post(`http://${BASE_URL}/users`, {
            data: {
                name: name,
            },
        });
    }

    getSentMessages(id: string) {
        return axios.get(`http://${BASE_URL}/messages/${id}/sent`);
    }

    getReceivedMessages(id: string) {
        return axios.get(`http://${BASE_URL}/messages/${id}/received`);
    }
}

export const api = new Api();
