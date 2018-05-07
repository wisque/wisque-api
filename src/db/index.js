const mongoose = require('mongoose');
const logger = require('src/lib/logger');
const mongooseParanoidPlugin = require('mongoose-paranoid-plugin');
const { mongodb } = require('src/config/env');
const PrefixedId = require('prefixed-id');

const generate = new PrefixedId();

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
            this._id = generate.new(schema.options.idPrefix);
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
