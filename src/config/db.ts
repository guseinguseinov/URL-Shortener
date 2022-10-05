import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const mongoDataBase: string = String(process.env.DB_LOCAL);

const connectDB = async () => {
    await mongoose.connect(mongoDataBase);
    console.log("Connected to database");
}

export default connectDB;