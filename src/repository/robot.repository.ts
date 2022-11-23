import { debug } from 'console';
import mongoose, { model, Types } from 'mongoose';
import {
    RobotProto,
    robotSchema,
    RobotTypes,
} from '../entities/robot.Types.js';

import { Data, id } from './repository.js';
export class RobotRepository implements Data<RobotTypes> {
    static instance: RobotRepository;

    public static getInstance(): RobotRepository {
        if (!RobotRepository.instance) {
            RobotRepository.instance = new RobotRepository();
        }
        return RobotRepository.instance;
    }
    #Model = model('Robots', robotSchema, 'robots');

    private constructor() {
        debug('instance');
    }
    async getAll(): Promise<Array<RobotTypes>> {
        return this.#Model.find().populate('owner', {
            robots: 0,
        });
    }

    async get(id: id): Promise<RobotTypes> {
        const result = await this.#Model
            .findById(id)
            .populate<{ _id: Types.ObjectId }>('owner', {
                robots: 0,
            });
        if (!result) throw new Error('Not found id');
        return result as RobotTypes;
    }
    async findOne(search: {
        [key: string]: string | number | Date;
    }): Promise<RobotTypes> {
        console.log({ search });
        const result = await this.#Model.findOne(search).populate('owner', {
            robots: 0,
        }); //as Robot;
        if (!result) throw new Error('Not found id');
        return result as unknown as RobotTypes;
    }

    async post(newRobot: RobotProto): Promise<RobotTypes> {
        const result = await (
            await this.#Model.create(newRobot)
        ).populate('owner', {
            robots: 0,
        });
        return result as RobotTypes;
    }

    async patch(id: id, updateRobot: Partial<RobotTypes>): Promise<RobotTypes> {
        const result = await this.#Model
            .findByIdAndUpdate(id, updateRobot, {
                new: true,
            })
            .populate('owner', {
                robots: 0,
            });
        if (!result) throw new Error('Not found id');
        return result as RobotTypes;
    }

    async delete(id: id): Promise<id> {
        const result = await this.#Model
            .findByIdAndDelete(id)
            .populate('owner', {
                robots: 0,
            });
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
