import { model, Schema } from 'mongoose';
import { IUser } from '../types';

const UserSchema = new Schema<IUser>({
    userToken: {
        type: String,
        required: [true, 'User Token is required']
    }
}, { timestamps: true });

const UserModel = model<IUser>('users', UserSchema);

export default UserModel;