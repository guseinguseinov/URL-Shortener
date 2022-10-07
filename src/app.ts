import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

import connectDB from './config/db';
import UserRoute from './routes/userRoute';
import URLRoute from './routes/urlRoute';
import errorHandler from './middlewares/errorHandler';
import notFound from './middlewares/notFound';
import apiLimiter from './middlewares/rateLimit';

dotenv.config({ path: path.resolve(__dirname, '.env') });
connectDB();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(apiLimiter);
app.use(helmet());
app.use(mongoSanitize());

app.use('/', UserRoute);
app.use('/urls', URLRoute);

app.all('*', notFound);
app.use(errorHandler);

export default app;