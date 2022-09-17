const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class BaseModel {
    constructor(name, collection, schema) {
        this.name = name;
        this.collection = collection;
        this.currentSchema = schema;

        this.modelSchema = new Schema(this.currentSchema, {
            timestamps: {
                createdAt: 'createdAt',
                updatedAt: 'updatedAt'
            }
        });

        this.model = mongoose.model(name, this.modelSchema);
    }

    /**
     * 
     * @param {string} id 
     * @returns 
     */
    objectId(id) {
        return mongoose.Types.ObjectId(id);
    }

    /**
     * 
     * @param {*} req 
     * @param {Object} query 
     * @param {Object} projection 
     * @returns 
     */
    async find(req, query, projection = {}) {
        const docs = await this.model.find(query, projection).lean();
        return docs;
    }

    /**
     * 
     * @param {*} req 
     * @param {Object} body 
     * @returns 
     */
    async create(req, body) {
        const doc = await this.model.create(body);
        return doc._doc;
    }

    /**
     * 
     * @param {*} req 
     * @param {Object} body 
     * @returns 
     */
    async createMany(req, body) {
        const docs = await this.model.insertMany(body);
        return docs;
    }

    /**
     * 
     * @param {*} req 
     * @param {Object} query 
     * @param {Object} updateInfo 
     * @returns 
     */
    async update(req, query, updateInfo) {
        const updated = this.model.updateOne(query, updateInfo);
        return updated;
    }

    /**
     * 
     * @param {*} req 
     * @param {Object} query 
     * @returns 
     */
    async delete(req, query) {
        const updated = this.model.deleteOne(query);
        return updated;
    }

}
module.exports = BaseModel;