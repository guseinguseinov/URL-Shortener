import { Request, Response } from 'express';
import crypto from 'crypto';
import UserModel from '../models/User';
import { IUser } from '../types';
import responseGenerate from '../utils/responseGenerator';


const userController = {
    async setCookie(req: Request, res: Response) {
        let { userToken = null } = req.cookies;
        if (!userToken) {
            userToken = crypto.randomBytes(64).toString("base64");
            res.cookie("userToken", userToken, {
                maxAge: 60 * 60 * 24 * 1000 * 365 * 20 // 20 years
            });

            const user = new UserModel<IUser>({ userToken });
            await user.save();
        } else {
            const user = await UserModel.findOne({ userToken });
            if (!user) {
                userToken = crypto.randomBytes(64).toString("base64");
                res.cookie("userToken", userToken, {
                    maxAge: 60 * 60 * 24 * 1000 * 365 * 20 // 20 years
                });

                const user = new UserModel<IUser>({ userToken });
                await user.save();
            }
        }
        res.status(200).json(responseGenerate(200, null, userToken));
    }
}

export default userController;