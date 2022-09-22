import mongoose, { ConnectOptions } from 'mongoose';

const mongoDataBase: string = String(process.env.DB_LOCAL);

const connectDB = async () => {
    await mongoose.connect(mongoDataBase);
    console.log("Connected to database");
}

export default connectDB;