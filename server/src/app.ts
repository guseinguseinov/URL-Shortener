import express, { Express } from 'express';
import path from 'path';
import * as dotenv from "dotenv";
import connectDB from './config/db';
import UserRoute from './routes/userRoute';
dotenv.config({ path: path.resolve(__dirname, '.env') });

connectDB();

const app: Express = express();

app.use('/users', UserRoute);

export default app;