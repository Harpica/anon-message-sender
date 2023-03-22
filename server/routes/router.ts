import express from 'express';
import { getReceivedMessages, getSentMessages } from '../controllers/message';
import { createUser, getAllUsers } from '../controllers/user';

export const router = express.Router();

router.post('/users', createUser);
router.get('/users', getAllUsers);

router.get('/messages/:id/sent', getSentMessages);
router.get('/messages/:id/received', getReceivedMessages);
