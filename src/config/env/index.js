const environment = process.env.NODE_ENV || 'development';
const configuration = require(`./${environment}`).default;

const defaults = {
    env: environment,
    port: 4000,
    version: 'v1'
};

export default {...defaults, ...configuration};
