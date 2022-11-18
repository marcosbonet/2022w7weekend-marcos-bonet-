import mongoose from 'mongoose';
import { USER, CLUSTER, PASSW } from './config.js';

export function dbConnect() {
    const DBName = 'Players';
    let uri = `mongodb+srv://${USER}:${PASSW}`;
    uri += `@${CLUSTER}/${DBName}?retryWrites=true&w=majority`;

    return mongoose.connect(uri);
}
