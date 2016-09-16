import morgan from 'koa-morgan';
import routes from './routes';

export default function(app) {
    app.use(routes);
    app.use(morgan('dev'));
}

