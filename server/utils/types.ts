import { Prisma } from '@prisma/client';

export type User = Prisma.UserSelect;
export type Message = Prisma.MessageSelect;
