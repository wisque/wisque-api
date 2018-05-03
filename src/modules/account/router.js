import Router from 'koa-router';
import passport from 'src/lib/passport';
import { signin } from 'src/modules/account/controller'

const router = new Router();

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), signin);
 
export default router.routes();