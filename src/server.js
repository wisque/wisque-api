require('./config/path').init();

const Koa = require('koa');
const configure = require('src/config/middleware');
const config = require('src/config/env');
const logger = require('src/lib/logger');

const app = new Koa();

configure(app);

app.listen(config.port, () => {
    logger.info(`
    ==============================
    WISQUE APP API   *************
    NOW RUNNING ON PORT ${config.port} *****
    ENVIRONMENT IS ${config.env.toUpperCase()}
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

