import { MongooseError } from 'mongoose';
import { dbConnect } from '../DB.connect';
import { RobotRepository } from './robot.repository';

const mockData = [
    {
        id: 'bs12df4',
        robotName: 'Pepe',
        velocity: 5,
        resistent: 4,
        creationDate: '05/85',
        img: 'url.img',
    },
    {
        id: 'as12df3',
        robotName: 'Pepe',
        velocity: 5,
        resistent: 4,
        creationDate: '05/85',
        img: 'url.img',
    },
];

describe('Given the robots repository,', () => {
    const repository = new RobotRepository();
    let testIds: Array<string>;

    beforeAll(async () => {
        await dbConnect();
        await repository.getModel().deleteMany();
        await repository.getModel().insertMany(mockData);
        const data = await repository.getModel().find();
        testIds = [data[0].id, data[1].id];
    });

    describe('When we instantiate getAll()', () => {
        test('It should return an array of all Robots', async () => {
            const result = await repository.getAll();
            expect(result[0].robotName).toEqual(mockData[0].robotName);
        });
    });

    describe('When we instantiate get(), with an id', () => {
        test('It should return the Robot of that id', async () => {
            const result = await repository.get(testIds[0]);
            expect(result.robotName).toEqual(mockData[0].robotName);
        });

        test('If the id is not valid, it should throw an error', async () => {
            expect(async () => {
                await repository.get(testIds[3]);
            }).rejects.toThrow();
        });
    });

    describe('When we instantiate post()', () => {
        test('It should return the new Robot', async () => {
            const newRobot = {
                id: 'cs12df5',
                robotName: 'Pepe',
                velocity: 5,
                resistent: 4,
                creationDate: '05/85',
                img: 'url.img',
            };
            const result = await repository.post(newRobot);
            expect(result.robotName).toEqual(newRobot.robotName);
        });
    });

    describe('When we instantiate patch(), with an id and an updated Robot', () => {
        test('It should return the updated Robot', async () => {
            const updatedRobot = {
                robotName: 'Jose',
            };
            const result = await repository.patch(testIds[0], updatedRobot);
            expect(result.robotName).toEqual(updatedRobot.robotName);
        });

        test('If the id is not valid, it should throw an error', async () => {
            expect(async () => {
                await repository.patch(testIds[3], {});
            }).rejects.toThrowError(MongooseError);
        });
    });

    describe('When we instantiate delete(), with an id', () => {
        test('It should return an object with the deleted id', async () => {
            const result = await repository.delete(testIds[0]);
            expect(result).toEqual({ id: testIds[0] });
        });

        test('If the id is wrong, it should throw an error', async () => {
            expect(async () => {
                await repository.delete(23);
            }).rejects.toThrow();
        });

        test('If the id is wrong, it should throw an error', async () => {
            expect(async () => {
                await repository.delete('6378fbf8fbdf746f860da478');
            }).rejects.toThrow();
        });

        test('Then if id is bad formate delete should throw an error', async () => {
            expect(async () => {
                await repository.delete(testIds[0]);
            }).rejects.toThrow();
        });
    });

    afterAll(async () => {
        await repository.disconnect();
    });
});
