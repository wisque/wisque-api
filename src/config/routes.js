const Router = require('koa-router');
const { versionify } = require('src/utils/helpers');
const { authMiddleware } = require('src/config/controller');
const event = require('src/modules/event/router');
const account = require('src/modules/account/router');
const user = require('src/modules/user/router');

const router = new Router();

router.use(versionify('/accounts'), account);
router.use(authMiddleware);
router.use(versionify('/events'), event);
router.use(versionify('/users'), user);

module.exports = router.routes();
