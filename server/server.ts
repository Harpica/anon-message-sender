import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { router } from './routes/router';
import { Messenger } from './services/message';

// Usage of .env file in the root dir
dotenv.config();

const app = express();

const PORT = process.env.APP_PORT || 5002;

const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

const server = app.listen(PORT, () => {
    console.log('Listening to', PORT);
});

const messenger = new Messenger(server);
messenger.start();
