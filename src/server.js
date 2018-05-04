require('./config/path').init();

const Koa = require('koa');
const configure = require('src/config/middleware');
const configuration = require('src/config/env');
const Mongo = require('src/db');
const logger = require('src/lib/logger');

const app = new Koa();

configure(app);

app.context.db = new Mongo(configuration.mongodb);

app.listen(configuration.port, () => {
    logger.info(`
    ==============================
    WISQUE APP API   *************
    NOW RUNNING ON PORT ${configuration.port} *****
    ENVIRONMENT IS ${configuration.env.toUpperCase()}
    ==============================
    `);
});

/** Handle all unhandled promise rejections and exceptions * */
process.on('uncaughtException', (error) => {
    logger.error(`Uncaught exception: "${error}". ${error.stack || 'No stack trace'}`);
});

process.on('unhandledRejection', (error) => {
    logger.error(`Unhandled promise rejection: "${error}". ${error.stack || 'No stack trace'}`);
});

