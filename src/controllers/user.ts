import { NextFunction, Request, Response } from 'express';
import { RobotTypes } from '../entities/robot.Types.js';
import { User } from '../entities/user.js';
import { HTTPError } from '../interfaces/error.js';
import { BasicData, Data } from '../repository/repository.js';
import { createToken, passwdValidate } from '../Services/auth.js';

export class UserController {
    constructor(
        public readonly repository: BasicData<User>,
        public readonly robotRepo: Data<RobotTypes>
    ) {
        //
    }

    async register(req: Request, resp: Response, next: NextFunction) {
        try {
            const user = await this.repository.post(req.body);
            resp.json({ user });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async login(req: Request, resp: Response, next: NextFunction) {
        try {
            const user = await this.repository.findOne({ name: req.body.name });
            user.id;
            const isPasswdValid = await passwdValidate(
                req.body.passwd,
                user.passwd
            );
            if (!isPasswdValid) throw new Error();
            const token = createToken({
                id: user.id,
                name: user.name,
                role: user.role,
            });
            resp.json({ token });
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }
    #createHttpError(error: Error) {
        if ((error as Error).message === 'Not found id') {
            const httpError = new HTTPError(
                404,
                'Not Found',
                (error as Error).message
            );
            return httpError;
        }
        const httpError = new HTTPError(
            503,
            'Service unavailable',
            (error as Error).message
        );
        return httpError;
    }
}
