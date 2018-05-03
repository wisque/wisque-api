const Router = require('koa-router');
const { versionify } = require('src/utils/helpers');
const { authMiddleware } = require('src/config/controller');
const event = require('src/modules/event/router');
const account = require('src/modules/account/router');

const router = new Router();

router.use(versionify('/accounts'), account);
router.use(authMiddleware);
router.use(versionify('/events'), event);

module.exports = router.routes();
