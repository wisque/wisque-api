const mongoose = require('mongoose');

class Mongo {
    constructor(config, options) {
        mongoose.Promise = global.Promise;

        mongoose.connect(config.url, options);

        // eslint-disable-next-line no-console
        mongoose.connection.on('open', () => console.log(`MongoDB ${config.name} connection -> established`));
        // eslint-disable-next-line no-console
        mongoose.connection.on('close', () => console.log(`MongoDB ${config.name} connection -> disconnected`));
    }
}

module.exports = Mongo;
