import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_BASE_URL || 'localhost:5002';

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
