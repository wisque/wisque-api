const morgan = require('koa-morgan');
const json = require('morgan-json');
const bodyParser = require('koa-bodyparser');

const passport = require('src/lib/passport');
const logger = require('src/lib/logger');
const config = require('src/config/env');
const { formatRequest } = require('src/utils/api.formatter');

const routes = require('./routes');


module.exports = function mw(app) {
    app.use(passport.initialize());

    if (config.logging) {
        const format = json({
            status: ':status',
            url: ':url',
            method: ':method',
            length: ':res[content-length]',
            routePath: ':routePath',
            'response-time': ':response-time ms',
            userIp: ':userIp',
        });

        morgan.token('routePath', req => req.routePath);
        morgan.token('userIp', (req) => {
            const clientIp = req.headers.userip;
            const remoteIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const ip = (clientIp === 'undefined' || clientIp === null) ? remoteIp : clientIp;

            return ip;
        });

        app.use(morgan(format, { stream: logger.stream }));
    }
    app.use(bodyParser());
    app.use(formatRequest);
    app.use(routes);
};

