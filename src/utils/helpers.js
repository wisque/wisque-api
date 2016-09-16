import config from 'src/config/env';

export default (url) => `/${config.version}${url}`;
