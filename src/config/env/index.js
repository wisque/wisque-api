const environment = process.env.NODE_ENV || 'development';

// eslint-disable-next-line import/no-dynamic-require
const configuration = require(`./${environment}`).default;

const defaults = {
    env: environment,
    host: 'localhost',
    protocol: 'http',
    port: 4000,
    buildApiUrl() {
        return `${this.protocol}://${this.host}:${this.port}`;
    },
    version: 'v1',
    database: {
        url: 'mongodb://mongodb/wisque-development',
        name: 'wisque-development',
    },
    jwt: {
        secret: 'cJy5gn9g3v9tquBL4rrEdvwC7xGTsygxDGCfB4SU',
        header: 'x-access-token',
        issuer: 'wisque',
        audience: 'audience',
        subject: 'subject',
        expiresIn: '1d',
    },
    facebook: {
        clientID: '154731858660245',
        clientSecret: 'f9916fa2be5b3ddc3eb71423162afeda',
        callbackPath: '/v1/accounts/facebook/callback',

    },
};

module.exports = { ...defaults, ...configuration };
