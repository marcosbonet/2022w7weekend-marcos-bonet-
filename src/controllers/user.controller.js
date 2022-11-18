import { HTTPError } from '../interfaces/error.js';
export class UserController {
    dataModel;
    constructor(dataModel) {
        this.dataModel = dataModel;
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
    #createHttpError(error) {
        if (error.message === 'Not found id') {
            const httpError = new HTTPError(404, 'Not Found', error.message);
            return httpError;
        }
        const httpError = new HTTPError(503, 'Service unavailable', error.message);
        return httpError;
    }
}
