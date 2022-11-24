import { NextFunction, Request, Response } from 'express';
import { request } from 'https';
import { RobotRepository } from '../repository/robot.repository';
import { UserRepository } from '../repository/user';

import { RobotController } from './robotController';

jest.mock('./../repository/RobotRepository.getInstance');

describe('Given RobotController', () => {
    const next: NextFunction = jest.fn();
    const req: Partial<Request> = {};

    const mockRobot = {
        id: '2',
        name: 'marcosbb',
        resistance: '9',
        speed: '9',
    };

    test('When when we use getAll, then it should give us an array with some robot inside', async () => {
        RobotRepository.getInstance.prototype.getAll = jest
            .fn()
            .mockResolvedValue(['PepeBot']);
        const repository = RobotRepository.getInstance();
        const useRepo = UserRepository.getInstance();
        const robotController = new RobotController(repository, useRepo);

        const resp: Partial<Response> = {
            json: jest.fn(),
        };

        await robotController.getAll(req as Request, resp as Response, next);
    });
    test('When when we use getAll, then it should give us an error', async () => {
        RobotRepository.getInstance.prototype.getAll = jest
            .fn()
            .mockRejectedValue({});
        const repository = RobotRepository.getInstance();
        const useRepo = UserRepository.getInstance();
        const robotController = new RobotController(repository, useRepo);

        const resp: Partial<Response> = {
            json: jest.fn(),
        };

        await robotController.getAll(req as Request, resp as Response, next);
    });
    test('When when we use get, then it should give us a robot item', async () => {
        RobotRepository.getInstance.prototype.get = jest
            .fn()
            .mockResolvedValue({ ...mockRobot });
        const repository = RobotRepository.getInstance();
        const useRepo = UserRepository.getInstance();
        const robotController = new RobotController(repository, useRepo);

        const req: Partial<Request> = {
            ...request,
            params: {
                id: '2',
            },
        };
        const resp: Partial<Response> = {
            json: jest.fn(),
        };

        await robotController.get(req as Request, resp as Response, next);
    });
    test('When when we use get, then it should give us an error', async () => {
        RobotRepository.getInstance.prototype.get = jest
            .fn()
            .mockRejectedValue({});
        const repository = RobotRepository.getInstance();
        const useRepo = UserRepository.getInstance();
        const robotController = new RobotController(repository, useRepo);

        const req: Partial<Request> = {};
        const resp: Partial<Response> = {
            json: jest.fn(),
        };

        await robotController.get(req as Request, resp as Response, next);
    });

    test('When when we use post, then it should create us a robot item', async () => {
        RobotRepository.getInstance.prototype.post = jest
            .fn()
            .mockResolvedValue({ ...mockRobot });
        const repository = RobotRepository.getInstance();
        const useRepo = UserRepository.getInstance();
        const robotController = new RobotController(repository, useRepo);

        const req: Partial<Request> = {
            ...request,
            body: { ...mockRobot },
        };
        const resp: Partial<Response> = {
            json: jest.fn(),
        };

        await robotController.post(req as Request, resp as Response, next);
    });
    test('When when we use post, then it should give us an error', async () => {
        RobotRepository.getInstance.prototype.post = jest
            .fn()
            .mockRejectedValue({});
        const repository = RobotRepository.getInstance();
        const useRepo = UserRepository.getInstance();
        const robotController = new RobotController(repository, useRepo);

        const req: Partial<Request> = {};
        const resp: Partial<Response> = {
            json: jest.fn(),
        };

        await robotController.post(req as Request, resp as Response, next);
    });
    test('When when we use patch, then it should modify a robot item', async () => {
        RobotRepository.getInstance.prototype.patch = jest
            .fn()
            .mockResolvedValue({ ...mockRobot, speed: '15' });
        const repository = RobotRepository.getInstance();
        const useRepo = UserRepository.getInstance();
        const robotController = new RobotController(repository, useRepo);

        const req: Partial<Request> = {
            ...request,
            params: {
                id: '2',
            },
            body: { ...mockRobot, speed: '15' },
        };
        const resp: Partial<Response> = {
            json: jest.fn(),
        };

        await robotController.patch(req as Request, resp as Response, next);
    });
    test('When when we use patch, then it should give us an error', async () => {
        RobotRepository.getInstance.prototype.patch = jest
            .fn()
            .mockRejectedValue({});
        const repository = RobotRepository.getInstance();
        const useRepo = UserRepository.getInstance();
        const robotController = new RobotController(repository, useRepo);

        const req: Partial<Request> = {};
        const resp: Partial<Response> = {
            json: jest.fn(),
        };

        await robotController.patch(req as Request, resp as Response, next);
    });
    test('When when we use delete, then it should delete a robot item', async () => {
        RobotRepository.getInstance.prototype.delete = jest
            .fn()
            .mockResolvedValue({});
        const repository = RobotRepository.getInstance();
        const useRepo = UserRepository.getInstance();
        const robotController = new RobotController(repository, useRepo);

        const req: Partial<Request> = {
            ...request,
            params: {
                id: '2',
            },
        };
        const resp: Partial<Response> = {
            json: jest.fn(),
        };

        await robotController.delete(req as Request, resp as Response, next);
    });
    test('When when we use delete, then it should give us an error', async () => {
        RobotRepository.getInstance.prototype.delete = jest
            .fn()
            .mockRejectedValue({});
        const repository = RobotRepository.getInstance();
        const useRepo = UserRepository.getInstance();
        const robotController = new RobotController(repository, useRepo);

        const req: Partial<Request> = {};
        const resp: Partial<Response> = {
            json: jest.fn(),
        };

        await robotController.delete(req as Request, resp as Response, next);
    });
});
