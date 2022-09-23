import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../types';

const cryptSalt: string = String(process.env.CRYPTO_SALT);

async function emailValidation(value: string) {
    if (!value) return false;
    const user = await UserModel.findOne({ email: value });
    if (user) return false;
    return true;
}

const UserSchema = new Schema<IUser>({
    userName: String,
    email: {
        type: String,
        required: [true, "Please enter valid email address"],
        validate: {
            validator: emailValidation,
            message: props => "This email address exsists, enter another email.",
        }
    },
    password: {
        type: String,
        required: [true, "Please enter valid password."],
    },
    userToken: String
});

UserSchema.methods.correctPassword = async function name(condidatePassword: string, userPassword: string) {
    return await bcrypt.compare(condidatePassword, userPassword);
}

UserSchema.pre('save', async function name(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, cryptSalt);
    next();
});


const UserModel = model<IUser>('users', UserSchema);

export default UserModel;