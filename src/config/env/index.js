const environment = process.env.NODE_ENV || 'development';
const configuration = require(`./${environment}`).default;

const defaults = {
    env: environment,
    port: 4000,
    version: 'v1',
    database: {
        url: 'mongodb://localhost/wisque-development',
        name: 'wisque-development'
    }
};

export default {...defaults, ...configuration};
