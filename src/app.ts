import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';

import connectDB from './config/db';
import UserRoute from './routes/userRoute';
import errorHandler from './middlewares/errorHandler';
import notFound from './middlewares/notFound';
import cookieParser from 'cookie-parser';
dotenv.config({ path: path.resolve(__dirname, '.env') });

connectDB();

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', UserRoute);

app.all('*', notFound);
app.use(errorHandler);

export default app;