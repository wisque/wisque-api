require('./config/path').init();

const Koa = require('koa');
const configure = require('src/config/middleware');
const configuration = require('src/config/env');
const Mongo = require('src/db');

const app = new Koa();

configure(app);

app.context.db = new Mongo(configuration.database);

app.listen(configuration.port, () => {
    console.log(`
    ==============================
    WISQUE APP API   *************
    NOW RUNNING ON PORT ${configuration.port} *****
    ENVIRONMENT IS ${configuration.env.toUpperCase()}
    ==============================
    `);
});

/** Handle all unhandled promise rejections and exceptions * */
process.on('uncaughtException', (error) => {
    console.error(`Uncaught exception: "${error}". ${error.stack || 'No stack trace'}`);
});

process.on('unhandledRejection', (error) => {
    console.error(`Unhandled promise rejection: "${error}". ${error.stack || 'No stack trace'}`);
});

