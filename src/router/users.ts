import { Router } from 'express';
import { UserController } from '../controllers/user.js';
import { RobotRepository } from '../repository/robot.repository.js';
import { UserRepository } from '../repository/user.js';

export const usersRouter = Router();

const controller = new UserController(
    new UserRepository(),
    new RobotRepository()
);

usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
