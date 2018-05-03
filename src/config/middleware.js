import morgan from 'koa-morgan';
import routes from './routes';
import bodyParser from 'koa-bodyparser'; 
import passport from 'src/lib/passport';

export default function(app) {
    app.use(passport.initialize());
    app.use(bodyParser());
    app.use(routes);
    app.use(morgan('dev'));
}

