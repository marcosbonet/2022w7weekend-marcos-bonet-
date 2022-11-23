import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { robotRouter } from './router/robot.js';
import { setCors } from './middlewares/cors.js';
import { errorManager } from './middlewares/errors.js';
import { usersRouter } from './router/users.js';

export const app = express();
app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(setCors);
app.use('/robots', robotRouter);
app.use('/user', usersRouter);

app.use(errorManager);

app.get('/', (_req, res) => {
    res.send('API Express de robots -> /robots').end();
});
