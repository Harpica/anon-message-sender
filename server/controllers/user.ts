import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import prisma from '../bd/prisma';

export const createUser = (
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    const userData = req.body.data;
    prisma.user
        .findFirst({
            where: {
                name: userData.name,
            },
        })
        .then((user: User | null) => {
            if (user) {
                res.send({ user: user });
                return;
            }
            prisma.user
                .create({ data: userData })
                .then((user: User) => {
                    res.send({ user: user });
                })
                .catch((err: Error) => console.log(err));
        })
        .catch((err: Error) => console.log(err));
};

export const getAllUsers = (
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    prisma.user
        .findMany()
        .then((data: Array<User>) => res.send(data))
        .catch((err: Error) => res.status(404).send(err));
};
