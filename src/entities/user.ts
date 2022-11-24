import mongoose, { model, Schema } from 'mongoose';

export type ProtoUser = {
    name?: string;
    email?: string;
    passwd?: string;
    role?: string;
    robots?: Array<typeof mongoose.Types.ObjectId>;
};

export type UserTypes = {
    id: string;
    name: string;
    email: string;
    passwd: string;
    role: string;
    robots: Array<typeof mongoose.Types.ObjectId>;
};

export const userSchema = new Schema<UserTypes>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: String,
    passwd: String,
    role: String,
});

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject._id;
        delete returnedObject.passwd;
    },
});
export const UserModel = model('User', userSchema, 'users');
