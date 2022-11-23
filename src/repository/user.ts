import { model } from 'mongoose';
import { User, userSchema } from '../entities/user.js';
import { passwdEncrypt } from '../Services/auth.js';
import { BasicData, id } from './repository.js';

export class UserRepository implements BasicData<User> {
    static instance: UserRepository;

    public static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }
    #Model = model('User', userSchema, 'users');

    async get(id: id): Promise<User> {
        const result = await this.#Model.findById(id); //as User;
        if (!result) throw new Error('Not found id');
        return result as User;
    }

    async post(data: Partial<User>): Promise<User> {
        if (typeof data.passwd !== 'string') throw new Error('');
        data.passwd = await passwdEncrypt(data.passwd);
        const result = await this.#Model.create(data);
        return result as User;
    }

    async findOne(search: { [key: string]: string }): Promise<User> {
        console.log(search);
        const result = await this.#Model.findOne(search); //as User;
        if (!result) throw new Error('Not found id');
        return result as unknown as User;
    }
}
