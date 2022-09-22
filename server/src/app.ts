import express, { Express } from 'express';
import { config } from "dotenv";
import connectDB from './config/db';
config();

connectDB();

const app: Express = express();

export default app;