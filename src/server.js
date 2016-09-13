import koa from 'koa';

const app = koa();

app.listen(4002, () => {
    console.log(`
    ==============================
    WISQUE APP API   *************
    NOW RUNNING ON PORT 4002 *****
    ENVIRONMENT IS DEVELOPMENT ***
    ==============================
    `);
});
