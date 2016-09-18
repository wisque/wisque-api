import Koa from 'koa';
import configure from './config/middleware';
import configuration from './config/env';
import Mongo from './db';

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

/** Handle all unhandled promise rejections and exceptions **/
process.on('uncaughtException', error => {
    console.error(`Uncaught exception: "${error}". ${error.stack || 'No stack trace'}`);
});

process.on('unhandledRejection', error => {
    console.error(`Unhandled promise rejection: "${error}". ${error.stack || 'No stack trace'}`);
});

