import { Router } from 'express';
import { RobotController } from '../controllers/robotController.js';
import { RobotRepository } from '../repository/robot.repository.js';

export const robotRouter = Router();

const controller = new RobotController(new RobotRepository());
robotRouter.get('/:id', controller.get.bind(controller));
robotRouter.get('/', controller.getAll.bind(controller));
robotRouter.post('/', controller.post.bind(controller));
robotRouter.patch('/:id', controller.patch.bind(controller));
robotRouter.delete('/:id', controller.delete.bind(controller));
