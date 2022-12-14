import { RobotTypes } from '../entities/robot.Types';
import { UserTypes } from '../entities/user';

export type id = string | number;

export interface BasicData<T> {
    get: (id: id) => Promise<T>;
    post: (data: Partial<T>) => Promise<T>;
    findOne: (data: any) => Promise<T>;
}

export interface ExtraData<T> {
    getAll: () => Promise<Array<T>>;
    patch: (id: id, data: Partial<T>) => Promise<T>;
    delete: (id: id) => Promise<void>;
}
export interface Data<T> extends BasicData<T> {
    getAll: () => Promise<Array<T>>;

    patch: (id: id, data: Partial<T>) => Promise<T>;
    delete: (id: id) => Promise<id>;
}

export interface UserRepo<T> extends BasicData<T> {
    addRobot: (user: UserTypes, robot: RobotTypes) => Promise<T>;
}
