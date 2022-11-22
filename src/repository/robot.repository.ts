import mongoose, { model, Schema } from 'mongoose';
import { RobotProto, RobotTypes } from '../entities/robot.Types.js';
import { Data, id } from './data.js';

export class RobotRepository implements Data<RobotTypes> {
    #schema = new Schema({
        robotName: {
            type: String,
            required: true,
            unique: true,
        },

        velocity: Number,
        resistent: Number,
        creationDate: String,
        img: String,
    });

    #Model = model('Robot', this.#schema, 'robots');

    constructor() {
        //
    }

    async getAll(): Promise<Array<RobotTypes>> {
        return this.#Model.find();
    }

    async get(id: id): Promise<RobotTypes> {
        const result = await this.#Model.findById(id);
        if (!result) throw new Error('Not found id');
        return result as RobotTypes;
    }

    async post(newRobot: RobotProto): Promise<RobotTypes> {
        const result = await this.#Model.create(newRobot);
        return result as RobotTypes;
    }

    async patch(id: id, updateRobot: Partial<RobotTypes>): Promise<RobotTypes> {
        const result = await this.#Model.findByIdAndUpdate(id, updateRobot, {
            new: true,
        });
        if (!result) throw new Error('Not found id');
        return result as RobotTypes;
    }

    async delete(id: id): Promise<{ id: id }> {
        const result = (await this.#Model.findByIdAndDelete(id)) as RobotTypes;
        if (result === null) throw new Error('Not found id');
        return { id: id } as unknown as Promise<RobotTypes>;
    }

    disconnect() {
        mongoose.disconnect();
    }

    getModel() {
        return this.#Model;
    }
}
