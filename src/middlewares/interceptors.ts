import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { HTTPError } from '../interfaces/error.js';
import { RobotRepository } from '../repository/robot.repository.js';
import { readToken } from '../Services/auth.js';
import createDebug from 'debug';
const debug = createDebug('W8:middlewares:interceptors');
export interface ExtraRequest extends Request {
    payload?: JwtPayload;
}

export const logged = (
    req: ExtraRequest,
    res: Response,
    next: NextFunction
) => {
    console.log('pepe');
    const authString = req.get('Authorization');
    if (!authString || !authString?.startsWith('Bearer')) {
        next(
            new HTTPError(403, 'Forbidden', 'Usuario o contraseña incorrecto')
        );
        return;
    }
    try {
        const token = authString.slice(7);
        debug(token, 'token propio');
        req.payload = readToken(token);
        debug(req.payload, 'payload propio');
        next();
    } catch (error) {
        next(
            new HTTPError(403, 'Forbidden', 'Usuario o contraseña incorrecto')
        );
    }
};
export const who = async (
    req: ExtraRequest,
    res: Response,
    next: NextFunction
) => {
    const repo = RobotRepository.getInstance();
    try {
        const robot = await repo.get(req.params.id);
        console.log(robot);
        if (robot.owner.toString() !== (req.payload as JwtPayload).id) {
            next(
                new HTTPError(
                    403,
                    'Forbidden',
                    'Usuario o contraseña incorrecto'
                )
            );
        }
        next();
    } catch (error) {
        next(error);
    }
};
