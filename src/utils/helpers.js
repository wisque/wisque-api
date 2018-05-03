const config = require('src/config/env');

module.exports = {
    versionify,
    buildParamMiddleware,
};

function versionify(url) {
    return `/${config.version}${url}`;
}

function buildParamMiddleware(retriever, dest) {
    return async function param(id, ctx, next) {
        const entity = await retriever(id);

        if (entity) {
            ctx.state[dest] = entity;
            await next();
        } else {
            ctx.throw(404, 'Not found');
        }
    };
}
