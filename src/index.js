import http from 'http';
import { app } from './app.js';
import * as dotenv from 'dotenv';
import { dbConnect } from './DB.connect.js';
dotenv.config();
import debugFactory from 'debug';
const debug = debugFactory('http');
debug('Hello debug');
//bugfix render import
const port = process.env.PORT || 3300;
const server = http.createServer(app);
server.on('listening', () => {
    const addr = server.address();
    if (addr === null)
        return;
    let bind;
    if (typeof addr === 'string') {
        bind = 'pipe ' + addr;
    }
    else {
        bind =
            addr.address === '::'
                ? `http://localhost:${addr?.port}`
                : `port ${addr?.port}`;
    }
    console.log(`Listening on ${bind}`);
});
server.on('error', (error, response) => {
    response.statusCode = error.statusCode;
    response.statusMessage = error.statusMessage;
    response.write(error.message);
    response.end();
});
dbConnect()
    .then(() => server.listen(port))
    .catch((error) => server.emit(error));
