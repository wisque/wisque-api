import mongoose from 'mongoose';

export default class Mongo {
    constructor(config, options) {
        mongoose.Promise = global.Promise;

        mongoose.connect(config.url, options);
 
        mongoose.connection.on('open', () => console.log(`MongoDB ${config.name} connection -> established`));
        mongoose.connection.on('close', () => console.log(`MongoDB ${config.name} connection -> disconnected`))
    }
}