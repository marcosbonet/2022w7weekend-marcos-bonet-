import mongoose from 'mongoose';
import { dbConnect } from './DB.connect.js';

test('should first', async () => {
    const result = await dbConnect();
    expect(typeof result).toBe(typeof mongoose);

    mongoose.disconnect();
});

test('should first', async () => {
    process.env.NODE_ENV = 'Robots';
    const result = await dbConnect();

    expect(typeof result).toBe(typeof mongoose);

    mongoose.disconnect();
});
