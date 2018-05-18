const mongoose = require('mongoose');
const logger = require('src/lib/logger');
const mongooseParanoidPlugin = require('mongoose-paranoid-plugin');
const { mongodb } = require('src/config/env');
const PrefixedId = require('prefixed-id');
const initialize = require('./repository');

const generate = new PrefixedId();

class Mongo {
    constructor(mongo) {
        this.mongo = mongo;

        this.mongo.Promise = global.Promise;

        this.mongo.plugin(mongooseParanoidPlugin, { field: 'deleted_at' });
        this.mongo.plugin(shortIdPlugin);
        this.mongo.plugin(renameIdPlugin);

        this.mongo.connect(mongodb.buildConnectionUrl());

        // eslint-disable-next-line no-console
        this.mongo.connection.on('open', () => logger.info(`MongoDB ${mongodb.database} connection -> established`));
        // eslint-disable-next-line no-console
        this.mongo.connection.on('close', () => logger.log(`MongoDB ${mongodb.database} connection -> disconnected`));

        modelPatch(this.mongo);

        return this.mongo;
    }
}

function modelPatch(mongo) {
    const oldModel = mongo.model;

    mongo.model = function model(...args) {
        const Model = oldModel.apply(this, args);
        Model.repository = initialize(Model);

        return Model;
    };
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

module.exports = new Mongo(mongoose);
