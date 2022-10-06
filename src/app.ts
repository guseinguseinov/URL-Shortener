import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';

import connectDB from './config/db';
import UserRoute from './routes/userRoute';
import URLRoute from './routes/urlRoute';
import errorHandler from './middlewares/errorHandler';
import notFound from './middlewares/notFound';

dotenv.config({ path: path.resolve(__dirname, '.env') });
connectDB();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', UserRoute);
app.use('/urls', URLRoute);

app.all('*', notFound);
app.use(errorHandler);

export default app;