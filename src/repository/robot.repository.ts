import { debug } from 'console';
import mongoose, { Types } from 'mongoose';
import { RobotProto, Robot, RobotTypes } from '../entities/robot.Types.js';

import { Data, id } from './repository.js';
export class RobotRepository implements Data<RobotTypes> {
    static instance: RobotRepository;

    public static getInstance(): RobotRepository {
        if (!RobotRepository.instance) {
            RobotRepository.instance = new RobotRepository();
        }
        return RobotRepository.instance;
    }

    private constructor() {
        debug('instance');
    }
    async getAll(): Promise<Array<RobotTypes>> {
        return Robot.find().populate('owner', {
            robots: 0,
        });
    }

    async get(id: id): Promise<RobotTypes> {
        const result = await Robot.findById(id).populate<{
            _id: Types.ObjectId;
        }>('owner', {
            robots: 0,
        });
        if (!result) throw new Error('Not found id');
        return result as RobotTypes;
    }
    async findOne(search: {
        [key: string]: string | number | Date;
    }): Promise<RobotTypes> {
        console.log({ search });
        const result = await Robot.findOne(search).populate('owner', {
            robots: 0,
        }); //as Robot;
        if (!result) throw new Error('Not found id');
        return result as unknown as RobotTypes;
    }

    async post(data: RobotProto): Promise<RobotTypes> {
        debug('post', data);
        data.date = this.#generateDate(data.date as string);
        const result = await (
            await Robot.create(data)
        ).populate('owner', {
            robots: 0,
        });
        return result as RobotTypes;
    }

    async patch(id: id, updateRobot: Partial<RobotTypes>): Promise<RobotTypes> {
        const result = await Robot.findByIdAndUpdate(id, updateRobot, {
            new: true,
        }).populate('owner', {
            robots: 0,
        });
        if (!result) throw new Error('Not found id');
        return result as RobotTypes;
    }

    async delete(id: id): Promise<id> {
        const result = await Robot.findByIdAndDelete(id).populate('owner', {
            robots: 0,
        });
        if (result === null) throw new Error('Not found id');
        return id;
    }

    disconnect() {
        mongoose.disconnect();
    }

    #generateDate(date: string | undefined) {
        if (!date) return new Date();
        const validDate =
            new Date(date) === new Date('') ? new Date() : new Date(date);
        return validDate;
    }
}
