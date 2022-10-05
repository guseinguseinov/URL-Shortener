import { Types } from 'mongoose';

export interface IUser {
    userToken: string,
}

export interface IURL {
    userId: Types.ObjectId,
    targetURL: string,
    shortURL: string,
}