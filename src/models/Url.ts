import { model, Schema } from 'mongoose';
import { IURL } from '../types';

const checkUniqueURL = async (value: string) => {
    if (value) {
        const URL = await URLModel.findOne({ shortURL: value });
        if (URL) return false;
    }
    return true;
}

const URLSchema = new Schema<IURL>({
    userId: {
        type: "ObjectId",
        ref: "users",
    },
    targetURL: {
        type: String,
        required: [true, "Target URl is required"],
    },
    shortURL: {
        type: String,
        required: true,
        validate: {
            validator: checkUniqueURL,
            message: props => `This URL has already been used.`,
        },
    }
});

const URLModel = model<IURL>("urls", URLSchema);

export default URLModel;