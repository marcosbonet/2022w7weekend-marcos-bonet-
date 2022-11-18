import mongoose, { Schema, model } from 'mongoose';
import { RobotProto, RobotTypes } from '../entities/robot.Types.js';
import { Data, id } from './repository.js';

export class RobotRepository implements Data<RobotTypes> {
    #schema = new Schema({
        robotName: String,
        velocity: Number,
        resistent: Number,
        creationDate: String,
        img: String,
    });
    #Model = model('RobotTypes', this.#schema, 'Robots');

    constructor() {
        this.#schema.set('toJSON', {
            transform: (_document, returnedObject) => {
                returnedObject.id = returnedObject._id;
                delete returnedObject.__v;
                delete returnedObject._id;
            },
        });
    }

    async getAll(): Promise<Array<RobotTypes>> {
        return this.#Model.find();
    }
    async get(id: id): Promise<RobotTypes> {
        const result = await this.#Model.findById(id); //as RobotTypes;
        if (!result) throw new Error('Not found id');
        return result as RobotTypes;
    }

    async post(data: Partial<RobotProto>): Promise<RobotTypes> {
        const result = await this.#Model.create(data);
        return result as RobotTypes;
    }
    async patch(id: id, data: Partial<RobotTypes>): Promise<RobotTypes> {
        const result = await this.#Model.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!result) throw new Error('Not found id');
        return result as RobotTypes;
    }

    async delete(id: id): Promise<{ id: id }> {
        const result = await this.#Model.findByIdAndDelete(id);
        if (result === null) throw new Error('Not found id');
        return { id: id };
    }

    #disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }

    getModel() {
        return this.#Model;
    }
}
