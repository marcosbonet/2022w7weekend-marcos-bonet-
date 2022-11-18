import mongoose, { Schema, model } from 'mongoose';
export class UserRepository {
    #schema = new Schema({
        id: String,
        name: String,
        email: String,
        password: String,
        roll: String,
    });
    #Model = model('UserTypes', this.#schema, 'players');
    constructor() {
        this.#schema.set('toJSON', {
            transform: (_document, returnedObject) => {
                returnedObject.id = returnedObject._id;
                delete returnedObject.__v;
                delete returnedObject._id;
            },
        });
    }
    async post(data) {
        const result = await this.#Model.create(data);
        return result;
    }
    #disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }
    getModel() {
        return this.#Model;
    }
}
