import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { playerRouter } from './router/player.js';
export const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.get('/', (_req, res) => {
    res.send('argentinian PLayer API').end();
});
app.use('/argentinianPlayer', playerRouter);
app.use((error, _req, resp, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    console.log(error.name, error.statusCode, error.statusMessage, error.message);
    let status = error.statusCode || 500;
    if (error.name === 'ValidationError') {
        status = 406;
    }
    const result = {
        status: status,
        type: error.name,
        error: error.message,
    };
    resp.status(status).json(result).end();
});
