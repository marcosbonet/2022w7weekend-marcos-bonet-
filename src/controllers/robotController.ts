import { NextFunction, Request, Response } from 'express';
import { RobotTypes } from '../entities/robot.Types.js';
import { User } from '../entities/user.js';

import { HTTPError } from '../interfaces/error.js';
import { BasicData, Data } from '../repository/repository.js';

export class RobotController {
    constructor(
        public dataModel: Data<RobotTypes>,
        public userRepo: BasicData<User>
    ) {
        //
    }
    async getAll(req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.dataModel.getAll();
            resp.json({ data });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async get(req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.dataModel.get(req.params.id);
            resp.json({ data });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async post(req: Request, resp: Response, next: NextFunction) {
        try {
            const robot = await this.dataModel.post(req.body);
            resp.json({ robot });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async patch(req: Request, resp: Response, next: NextFunction) {
        try {
            const robot = await this.dataModel.patch(req.params.id, req.body);
            resp.json({ robot });
        } catch (error) {
            (error as Error).message === 'Not found id';
            const httpError = new HTTPError(
                404,
                'Not Found',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async delete(req: Request, resp: Response, next: NextFunction) {
        try {
            await this.dataModel.delete(req.params.id);
            resp.json({ id: req.params.id });
        } catch (error) {
            (error as Error).message === 'Not found id';
            const httpError = new HTTPError(
                404,
                'Not Found',
                (error as Error).message
            );
            next(httpError);
        }
    }
}
