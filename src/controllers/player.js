import { HTTPError } from '../interfaces/error.js';
export class PlayerController {
    dataModel;
    constructor(dataModel) {
        this.dataModel = dataModel;
    }
    async getAll(req, resp, next) {
        try {
            const data = await this.dataModel.getAll();
            resp.json({ data });
        }
        catch (error) {
            const httpError = new HTTPError(503, 'Service unavailable', error.message);
            next(httpError);
        }
    }
    async get(req, resp, next) {
        try {
            const data = await this.dataModel.get(req.params.id);
            resp.json({ data });
        }
        catch (error) {
            next(this.#createHttpError(error));
        }
    }
    async post(req, resp, next) {
        try {
            const player = await this.dataModel.post(req.body);
            resp.json({ player });
        }
        catch (error) {
            const httpError = new HTTPError(503, 'Service unavailable', error.message);
            next(httpError);
        }
    }
    async patch(req, resp, next) {
        try {
            const player = await this.dataModel.patch(req.params.id, req.body);
            resp.json({ player });
        }
        catch (error) {
            next(this.#createHttpError(error));
        }
    }
    async delete(req, resp, next) {
        try {
            await this.dataModel.delete(req.params.id);
            resp.json({}).end();
        }
        catch (error) {
            next(this.#createHttpError(error));
            return;
        }
    }
    #createHttpError(error) {
        if (error.message === 'Not found id') {
            const httpError = new HTTPError(404, 'Not Found', error.message);
            return httpError;
        }
        const httpError = new HTTPError(503, 'Service unavailable', error.message);
        return httpError;
    }
}
