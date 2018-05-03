const morgan = require('koa-morgan');
const bodyParser = require('koa-bodyparser');
const passport = require('src/lib/passport');
const routes = require('./routes');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(bodyParser());
    app.use(routes);
    app.use(morgan('dev'));
};

