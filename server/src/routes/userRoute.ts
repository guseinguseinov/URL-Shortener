import { Router, Response, Request } from 'express';
import UserModel from '../models/User';

const UserRoute: Router = Router();

UserRoute.get("/", async (req: Request, res: Response) => {
    const users = await UserModel.find();
    res.send(users);
});

export default UserRoute;