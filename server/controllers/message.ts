import { NextFunction, Request, Response } from 'express';
import prisma from '../bd/prisma';
import { MessageData } from '../services/message';

export const getSentMessages = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id);
    prisma.message
        .findMany({
            where: {
                senderID: id,
            },
        })
        .then((data) => {
            res.send({ messages: data });
        })
        .catch((err: Error) => console.log(err));
};

export const getReceivedMessages = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = parseInt(req.params.id);
    prisma.message
        .findMany({
            where: {
                recipientID: id,
            },
        })
        .then((data) => {
            res.send({ messages: data });
        })
        .catch((err: Error) => console.log(err));
};

export const createMessage = ({
    title,
    body,
    senderID,
    senderName,
    recipientID,
    recipientName,
}: MessageData) => {
    const date = new Date(Date.now());
    return prisma.message.create({
        data: {
            date: date,
            title: title,
            body: body,
            senderName: senderName,
            sender: {
                connect: {
                    id: senderID,
                },
            },
            recipient: {
                connectOrCreate: {
                    where: {
                        id: recipientID,
                    },
                    create: {
                        name: recipientName,
                    },
                },
            },
            recipientName: recipientName,
        },
    });
};
