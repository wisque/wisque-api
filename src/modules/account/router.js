const Router = require('koa-router');
const passport = require('src/lib/passport');
const { signin } = require('src/modules/account/controller');

const router = new Router();

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), signin);

module.exports = router.routes();
