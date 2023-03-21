import { NextFunction, Request, Response } from 'express';
import prisma from '../bd/prisma';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body.data;
    prisma.user
        .create({ data: userData })
        .then((user) => {
            res.send({ user: user });
        })
        .catch((err) => console.log(err));
};

export const getAllUsers = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    prisma.user
        .findMany()
        .then((data) => res.send(data))
        .catch((err) => res.status(404).send(err));
};
