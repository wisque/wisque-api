const mongoose = require('mongoose');
const logger = require('src/lib/logger');
const mongooseParanoidPlugin = require('mongoose-paranoid-plugin');
const shortid = require('shortid');
const { mongodb } = require('src/config/env');

class Mongo {
    constructor() {
        mongoose.Promise = global.Promise;

        mongoose.plugin(mongooseParanoidPlugin, { field: 'deleted_at' });
        mongoose.plugin(shortIdPlugin);
        mongoose.plugin(renameIdPlugin);

        mongoose.connect(mongodb.buildConnectionUrl());

        // eslint-disable-next-line no-console
        mongoose.connection.on('open', () => logger.info(`MongoDB ${mongodb.database} connection -> established`));
        // eslint-disable-next-line no-console
        mongoose.connection.on('close', () => logger.log(`MongoDB ${mongodb.database} connection -> disconnected`));

        return mongoose;
    }
}

function shortIdPlugin(schema) {
    schema.add({ _id: 'string' });
    schema.pre('save', function generateId(next) {
        if (!this._id) {
            this._id = shortid.generate();
        }

        next();
    });
}

function renameIdPlugin(schema) {
    return schema.method('toJSON', function toJSON() {
        const obj = this.toObject();
    
        obj.id = obj._id;
        delete obj._id;
    
        return obj;
    });
}

module.exports = new Mongo();
