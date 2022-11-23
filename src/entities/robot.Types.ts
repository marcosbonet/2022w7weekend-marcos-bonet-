import mongoose, { Schema } from 'mongoose';

export type RobotProto = {
    name?: string;
    image?: string;
    speed?: number;
    resistance?: number;
    date?: Date;
    owner?: typeof mongoose.Types.ObjectId;
};

export type RobotTypes = {
    id: typeof mongoose.Types.ObjectId;
    name: string;
    image: string;
    speed: number;
    resistance: number;
    date: Date;
    owner: typeof mongoose.Types.ObjectId;
};

export const robotSchema = new Schema<RobotTypes>({
    id: {
        type: mongoose.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: String,
    speed: { type: Number, min: 0, max: 10 },
    resistance: { type: Number, min: 0, max: 10 },
    date: Date,
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

robotSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject._id;
    },
});
