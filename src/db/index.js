const mongoose = require('mongoose');
const logger = require('src/lib/logger');

class Mongo {
    constructor(config, options) {
        mongoose.Promise = global.Promise;

        mongoose.connect(config.buildConnectionUrl(), options);

        // eslint-disable-next-line no-console
        mongoose.connection.on('open', () => logger.info(`MongoDB ${config.name} connection -> established`));
        // eslint-disable-next-line no-console
        mongoose.connection.on('close', () => logger.log(`MongoDB ${config.name} connection -> disconnected`));
    }
}

module.exports = Mongo;
