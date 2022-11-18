import mongoose from 'mongoose';
import { dbConnect } from '../DB.connect.js';
import { RobotRepository } from './robot.repository.js';

const PlayerMock = [
    {
        robotName: 'string',
        velocity: 3,
        resistent: 4,
        creationDate: 'string',
        id: 'string',
        img: 'string',
    },
    {
        robotName: 'string',
        velocity: 3,
        resistent: 4,
        creationDate: 'string',
        id: 'string',
        img: 'string',
    },
];

describe('Given ...', () => {
    const repository = new RobotRepository();

    let testIds: Array<string>;
    beforeAll(async () => {
        await dbConnect();
        await repository.getModel().deleteMany();
        await repository.getModel().insertMany(PlayerMock);
        const data = await repository.getModel().find();
        testIds = [data[0].id, data[1].id];
    });

    test('Then getAll...', async () => {
        const result = await repository.getAll();
        expect(result[0].robotName).toEqual(PlayerMock[0].robotName);
    });
    test('the get should have been called', async () => {
        const result = await repository.get(testIds[0]);
        expect(result.velocity).toBe('string');
    });
    test('the post should have been called', async () => {
        const newRobot = {
            robotName: 'string',
            velocity: 3,
            resistent: 4,
            creationDate: 'string',
            id: 2,
            img: 'string',
        };
        const result = await repository.post(newRobot);
        expect(result).toEqual(newRobot.robotName);
    });
    test('the patch should have been called', async () => {
        const result = await repository.patch('', PlayerMock[0]);
        expect(result).toEqual(PlayerMock);
    });
    test('the delete should have been called', async () => {
        const result = await repository.delete(testIds[1]);
        expect(result).toEqual([]);
    });

    test('Then id is bad forman', async () => {
        expect(async () => {
            await repository.delete('');
        }).rejects.toThrowError(mongoose.Error.CastError);
    });
    afterAll(() => {
        mongoose.disconnect();
    });
});
