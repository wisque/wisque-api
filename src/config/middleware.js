import morgan from 'koa-morgan';

export default function(app) {
    app.use(morgan('dev'));
}

