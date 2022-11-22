import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user.js';
import { CustomError, HTTPError } from '../interfaces/error.js';
import { BasicData } from '../repository/data.js';
import { createToken, passwdValidate } from '../Services/auth.js';

export class UserController {
    createHttpError(error: CustomError) {
        throw new Error('Method not implemented.');
    }
    constructor(public readonly repository: BasicData<User>) {
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
            const user = await this.repository.find({ name: req.body.name });
            const isPasswdValid = await passwdValidate(
                req.body.passwd,
                user.passwd
            );
            if (!isPasswdValid) throw new Error();
            const token = createToken({ userName: user.name });
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
