import { NextFunction, Request, Response } from 'express';
import prisma from '../bd/prisma';

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
        .catch((err) => console.log(err));
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
        .catch((err) => console.log(err));
};

export const createMessage = (
    title: string,
    sender: number,
    recipient: number,
    recipientName: string
) => {
    return prisma.message.create({
        data: {
            title: title,
            sender: {
                connect: {
                    id: sender,
                },
            },
            recipient: {
                connectOrCreate: {
                    where: {
                        id: recipient,
                    },
                    create: {
                        name: recipientName,
                    },
                },
            },
        },
    });
};
