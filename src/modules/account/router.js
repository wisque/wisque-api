const Router = require('koa-router');
const passport = require('src/lib/passport');
const { signin } = require('src/modules/account/controller');

const router = new Router();

router.get('/facebook', passport.authenticate('facebook-web'));
router.get('/facebook/callback', passport.authenticate('facebook-web', { session: false }), signin);
router.get('/facebook/token', passport.authenticate('facebook-token', { session: false }), signin);

router.get('/vk', passport.authenticate('vk-web'));
router.get('/vk/callback', passport.authenticate('vk-web', { session: false }), signin);
router.get('/vk/token', passport.authenticate('vk-token', { session: false }), signin);

module.exports = router.routes();
