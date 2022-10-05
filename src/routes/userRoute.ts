import { Router } from 'express';
import userController from '../controllers/user.controller';
import catchError from '../utils/catchError';

const UserRoute: Router = Router();

UserRoute.get("/", catchError(userController.setCookie));

export default UserRoute;