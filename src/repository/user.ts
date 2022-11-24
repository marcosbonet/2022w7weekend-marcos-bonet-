import { UserModel, UserTypes } from '../entities/user.js';
import { passwdEncrypt } from '../Services/auth.js';
import { BasicData, id } from './repository.js';

export class UserRepository implements BasicData<UserTypes> {
    static instance: UserRepository;

    public static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    async get(id: id): Promise<UserTypes> {
        const result = await UserModel.findById(id); //as User;
        if (!result) throw new Error('Not found id');
        return result as UserTypes;
    }

    async post(data: Partial<UserTypes>): Promise<UserTypes> {
        if (typeof data.passwd !== 'string') throw new Error('');
        data.passwd = await passwdEncrypt(data.passwd);
        const result = await UserModel.create(data);
        return result as UserTypes;
    }

    async findOne(search: { [key: string]: string }): Promise<UserTypes> {
        console.log(search);
        const result = await UserModel.findOne(search); //as User;
        if (!result) throw new Error('Not found id');
        return result as unknown as UserTypes;
    }
}
