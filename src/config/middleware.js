import morgan from 'koa-morgan';
import routes from './routes';
import bodyParser from 'koa-bodyparser'; 

export default function(app) {
    app.use(bodyParser());
    app.use(routes);
    app.use(morgan('dev'));
}

