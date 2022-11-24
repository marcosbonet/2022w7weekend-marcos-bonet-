import mongoose from 'mongoose';
import request from 'supertest'; //request es una funcion, se va a ejecutar al margen de todo
import { app } from '../app';
import { dbConnect } from '../DB.connect';
import { Robot } from '../entities/robot.Types';
import { createToken, TokenPayload } from '../Services/auth';
import { UserModel } from '../entities/user';

const setCollection = async () => {
    const usersMock = [
        { name: 'Pepe', email: 'pepe@acme.com', role: 'user' },
        { name: 'Ramon', email: 'ramon@acme.com', role: 'user' },
    ];
    await UserModel.deleteMany();
    await UserModel.insertMany(usersMock);
    await Robot.deleteMany();
    const data = await UserModel.find();
    const testIds = [data[0].id, data[1].id];
    return testIds;
};

describe('Given an app with /robots route', () => {
    describe('when i have connection to mongodb', () => {
        let token: string;
        let ids: Array<string>;
        beforeEach(async () => {
            //con before each, para cada test, la conexion se abre y se cierra. con el beforeall, la conexion se abre, pero se cierra una vez terminados todos los tests
            await dbConnect();
            ids = await setCollection();
            //crear token para utilizarlo en el post, patch y delete
            const payload: TokenPayload = {
                id: ids[0],
                name: 'Pepe',
                role: 'Admin',
            };
            token = createToken(payload);
        });

        afterEach(() => {
            mongoose.disconnect();
        });

        //para get
        test('then the get to url /robots/ should send status 200', async () => {
            const response = await request(app).get('/robots/'); //a request necesitamos pasarle una aplicacion. no es el get del controller, es el get del propio request del testing, necesito la url a la que quieres que haga test. es como postman pero viendo el resultado en pantalla
            expect(response.status).toBe(200);
        });
        //esto es lo anterior pero de otra forma, es mejor esta:
        test('then the get to url /robots/ should send status 200 another form', async () => {
            await request(app).get('/robots/').expect(200);
        });

        //para get/id
        test('then the get to url /robots/:id with an invalid format id should send status 503', async () => {
            const response = await request(app).get('/robots/23');
            expect(response.status).toBe(503); //porque es un error generico que no tengo previsto que se gestione de otra manera
        });
        test('then the get to url /robots/:id with an invalid id should send status 404', async () => {
            const response = await request(app).get(
                '/robots/63767230468689cb0b474401'
            );
            expect(response.status).toBe(404);
        });
        //post
        test('then the post to url /robots without authorization should send status 403', async () => {
            //para hacer el post necesitas los datos y esos datos estan en el body, para eso utilizamos el metodo send
            const response = await request(app).post('/robots/').send({}); //lo ponemos vacio porque como se que no voy a poder hacer post porque no estoy autenticado, no hace falta ni que ponga nada
            expect(response.status).toBe(403);
        });
        test('then the post to url /robots with authorization should send status 200', async () => {
            //metodo set de supertest vale para setear cabeceras, 2 argumentos:
            const response = await request(app)
                .post('/robots/')
                .set('Authorization', `Bearer ${token}`)
                .send({ name: 'PepeBot' });
            expect(response.status).toBe(201);
        });
        test('then the patch to url /robots/:id without authorization should send status 403', async () => {
            //para hacer el post necesitas los datos y esos datos estan en el body, para eso utilizamos el metodo send
            const response = await request(app).patch('/robots/').send({}); //lo ponemos vacio porque como se que no voy a poder hacer post porque no estoy autenticado, no hace falta ni que ponga nada
            expect(response.status).toBe(404);
        });
        test('then the patch to url /robots/:id with authorization and invalid format should send status 503', async () => {
            //metodo set de supertest vale para setear cabeceras, 2 argumentos:
            const response = await request(app)
                .patch('/robots/23')
                .set('Authorization', `Bearer ${token}`)
                .send({});
            expect(response.status).toBe(503);
        });

        test('then the patch to url /robots/:id with authorization but non-existant should send status 404', async () => {
            //metodo set de supertest vale para setear cabeceras, 2 argumentos:
            const response = await request(app)
                .patch('/robots/63767230468689cb0b474401')
                .set('Authorization', `Bearer ${token}`)
                .send({});
            expect(response.status).toBe(404);
        });

        //delete
        test('then the delete to url /robots/:id without authorization should send status 403', async () => {
            //para hacer el post necesitas los datos y esos datos estan en el body, para eso utilizamos el metodo send
            const response = await request(app).delete('/robots/23'); //lo ponemos vacio porque como se que no voy a poder hacer post porque no estoy autenticado, no hace falta ni que ponga nada
            expect(response.status).toBe(403);
        });
        test('then the delete to url /robots/:id with authorization and a valid id but non-existent should send status 404', async () => {
            const response = await request(app)
                .delete('/robots/63767230468689cb0b474401')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(404);
        });
        test('then the delete to url /robots/:id with authorization and an invalid id should send status 503', async () => {
            const response = await request(app)
                .delete('/robots/23')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(503);
        });
    });
});
