import mongoose from 'mongoose';
import { dbConnect } from '../DB.connect.js';
import { UserRepository } from './user.js';
describe('Given UserRepository', () => {
    const mockData = [
        {
            name: 'pedro',
            email: 'pepe@gmail.com',
            password: 'pepe1234',
            role: 'Admin',
        },
        {
            name: 'Ernesto',
            email: 'ernest@gmail.com',
            password: '789ErnesT',
            role: 'Empleado',
        },
    ];

    const repository = new UserRepository();
    let testIds: Array<string>;
    beforeAll(async () => {
        await dbConnect();
        await repository.getUserModel().deleteMany();
        await repository.getUserModel().insertMany(mockData);
        const data = await repository.getUserModel().find();
        testIds = [data[0].id, data[1].id];
    });
    afterAll(async () => {
        mongoose.disconnect();
    });

    test('Then get should return an user', async () => {
        const result = await repository.get(testIds[0]);
        expect(result.name).toEqual(mockData[0].name);
    });

    test('when get it receives an invalid id it should return an error', async () => {
        expect(async () => {
            await repository.get(testIds[4]);
        }).rejects.toThrowError();
    });

    test('Then post...', async () => {
        const newUser = {
            name: 'Marcos',
            password: '123',
            email: 'marcos@gmail.com',
            role: 'slave',
        };
        await repository.post(newUser);
        expect(newUser.name).toBe('Marcos');
    });

    test('when post it receives an invalid id it should return an error', async () => {
        expect(async () => {
            await repository.post({ passwd: testIds[2] });
        }).rejects.toThrowError();
    });
});
