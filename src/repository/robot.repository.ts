import mongoose, { model } from 'mongoose';
import {
    RobotProto,
    robotSchema,
    RobotTypes,
} from '../entities/robot.Types.js';

import { Data, id } from './repository.js';
export class RobotRepository implements Data<RobotTypes> {
    #Model = model('Robots', robotSchema, 'robots');

    async getAll(): Promise<Array<RobotTypes>> {
        return this.#Model.find();
    }

    async get(id: id): Promise<RobotTypes> {
        const result = await this.#Model.findById(id);
        if (!result) throw new Error('Not found id');
        return result as RobotTypes;
    }
    async findOne(search: {
        [key: string]: string | number | Date;
    }): Promise<RobotTypes> {
        console.log({ search });
        const result = await this.#Model.findOne(search); //as Robot;
        if (!result) throw new Error('Not found id');
        return result as unknown as RobotTypes;
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

    async delete(id: id): Promise<id> {
        const result = (await this.#Model.findByIdAndDelete(id)) as RobotTypes;
        if (result === null) throw new Error('Not found id');
        return id;
    }

    #disconnect() {
        mongoose.disconnect();
    }

    #generateDate(date: string | undefined) {
        if (!date) return new Date();
        const validDate =
            new Date(date) === new Date('') ? new Date() : new Date(date);
        return validDate;
    }
    getModel() {
        return this.#Model;
    }
}
