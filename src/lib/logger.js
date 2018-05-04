const url = require('url');
const moment = require('moment');
const querystring = require('querystring');
const winston = require('winston');
const { mongodb } = require('src/config/env');

require('winston-mongodb').MongoDB; // eslint-disable-line

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.MongoDB)({
            db: mongodb.buildConnectionUrl(),
            collection: 'logs',
            expireAfterSeconds: 2592000, // 30 days
        }),
        new (winston.transports.Console)({
            handleExceptions: true,
            humanReadableUnhandledException: true,
            colorize: true,
        }),
    ],
});

logger.stream = {
    write(message) {
        const data = JSON.parse(message);
        const urlObject = url.parse(data.url);
        const time = moment().format('DD-MM-YYYY HH:mm:ss');

        data.userIp = sanitiseIP(data.userIp);

        const info = { ...data, pathname: urlObject.pathname, query: querystring.parse(urlObject.query) };
        logger.log('info', `[${time}] HTTP request`, info);
    },
};

function sanitiseIP(ip) {
    if (!ip) {
        return null;
    }

    const LO = '127.0.0.1';
    let sanitisedIp = ip;

    const IP6_PREFIX = '::ffff:';
    const IP6_LO = '::1';

    if (sanitisedIp.startsWith(IP6_PREFIX)) { // pseudo IPv6 addresses
        sanitisedIp = sanitisedIp.substr(IP6_PREFIX.length);
    }

    if (sanitisedIp === IP6_LO) {
        sanitisedIp = LO;
    }

    return sanitisedIp;
}

module.exports = logger;
