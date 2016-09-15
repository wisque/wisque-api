import Koa from 'koa';
import configure from './config/middleware';
import configuration from './config/env';

const app = new Koa();

configure(app);

app.listen(configuration.port, () => {
    console.log(`
    ==============================
    WISQUE APP API   *************
    NOW RUNNING ON PORT ${configuration.port} *****
    ENVIRONMENT IS ${configuration.env.toUpperCase()}
    ==============================
    `);
});
