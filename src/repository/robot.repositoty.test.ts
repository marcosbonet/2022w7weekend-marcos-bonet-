import mongoose from 'mongoose';
import { dbConnect } from '../DB.connect.js';

import { RobotRepository } from './robot.repository.js';

const mockData = [
    {
        id: 'string',
        robotName: 'string',
        velocity: 1,
        resistent: 2,
        creationDate: 'string',

        img: 'string',
    },
    {
        id: 'string',
        robotName: 'string',
        velocity: 1,
        resistent: 2,
        creationDate: 'string',
        img: 'string',
    },
];
describe('Given RobotRepository', () => {
    describe('When we instantiate it', () => {
        const repository = new RobotRepository();
        let testIds: Array<string>;

        beforeAll(async () => {
            await dbConnect();
            await repository.getModel().deleteMany();
            await repository.getModel().insertMany(mockData);
            const data = await repository.getModel().find();
            testIds = [data[0].id, data[1].id];
        });
        afterAll(() => {
            mongoose.disconnect();
        });

        test('Then getAll should have been called', async () => {
            const result = await repository.getAll();
            expect(result[0].img).toEqual(mockData[0].img);
            expect(await repository.get.all);
        });
        test('Then get should have been called', async () => {
            const result = await repository.get(1);
            expect(result.img).toEqual('jsd');
        });
        test('Then post should have been called', async () => {
            const newRobot = {
                id: 'string',
                robotName: 'string',
                velocity: 1,
                resistent: 2,
                creationDate: 'string',
                img: 'string',
            };
            const result = await repository.post(newRobot);
            expect(result.velocity).toEqual(newRobot.velocity);
        });
        test('Then patch should have been called', async () => {
            const result = await repository.patch(4, mockData[0]);
            expect(result).toEqual(mockData);
        });
        test('Then delete should have been called', async () => {
            const result = await repository.delete(2);
            expect(result).toEqual([]);
        });
        test('Then if id is bad formated delete should throw an error', async () => {
            expect(async () => {
                await repository.delete(2);
            }).rejects.toThrowError(mongoose.Error.CastError);
        });
    });
});
