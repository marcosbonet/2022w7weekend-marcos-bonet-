import { Schema, Types, model } from 'mongoose';

export type RobotProto = {
    name?: string;
    image?: string;
    speed?: number;
    resistance?: number;
    date?: Date | string;
    owner?: Types.ObjectId;
};

export type RobotTypes = {
    id: Types.ObjectId;
    name: string;
    image: string;
    speed: number;
    resistance: number;
    date: Date;
    owner: Types.ObjectId;
};

export const robotSchema = new Schema<RobotTypes>({
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
        type: Schema.Types.ObjectId,
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
export const Robot = model<RobotTypes>('Robots', robotSchema, 'robots');
