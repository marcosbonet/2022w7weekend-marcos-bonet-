export class HTTPError extends Error {
    statusCode;
    statusMessage;
    message;
    options;
    constructor(statusCode, statusMessage, message, options) {
        super(message, options);
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.message = message;
        this.options = options;
        this.name = 'HTTPError';
    }
}
