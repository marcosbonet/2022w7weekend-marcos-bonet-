import mongoose, { Schema, model } from 'mongoose';
export class PLayerRepository {
    #schema = new Schema({
        player: String,
        position: String,
        age: Number,
        club: String,
        marketPrice: String,
    });
    #Model = model('PlayerTypes', this.#schema, 'players');
    constructor() {
        this.#schema.set('toJSON', {
            transform: (_document, returnedObject) => {
                returnedObject.id = returnedObject._id;
                delete returnedObject.__v;
                delete returnedObject._id;
            },
        });
    }
    async getAll() {
        return this.#Model.find();
    }
    async get(id) {
        const result = await this.#Model.findById(id); //as PlayerTypes;
        if (!result)
            throw new Error('Not found id');
        return result;
    }
    async post(data) {
        const result = await this.#Model.create(data);
        return result;
    }
    async patch(id, data) {
        const result = await this.#Model.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!result)
            throw new Error('Not found id');
        return result;
    }
    async delete(id) {
        const result = await this.#Model.findByIdAndDelete(id);
        if (result === null)
            throw new Error('Not found id');
        return;
    }
    #disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }
    getModel() {
        return this.#Model;
    }
}
