import { createToken, readToken } from './auth';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';
// Para mockear el SECRET
// import * as config from '../config.js';
// jest.mock('../config.js');
// config.SECRET = 'fjksdjksfjk'

const mock = {
    id: '1234asd',
    name: 'nestor',
    role: 'user',
};

describe('Given createToken ', () => {
    test('Then...', () => {
        const signSpy = jest.spyOn(jwt, 'sign');
        const r = createToken(mock);
        expect(typeof r).toBe('string');
        expect(signSpy).toHaveBeenCalledWith(mock, SECRET);
    });
});

describe('Given "readToken"', () => {
    describe('When token is valid', () => {
        const validToken = createToken(mock);
        test('Then', () => {
            const result = readToken(validToken);
            expect(result.name).toEqual(mock.name);
        });
    });

    describe('Whne token is not valid', () => {
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE2Njg3NzMwNTB9.DGdcCXGRUS4SaCMyY5RSy-8v9tylvmV_HE1rQJGYJ_5';
        test('should', () => {
            expect(() => {
                readToken(token);
            }).toThrow();
        });
    });

    describe('Whne token is bad formatted', () => {
        const token = 'soy un token';
        test('should', () => {
            expect(() => {
                readToken(token);
            }).toThrow();
        });
    });
});
