const Router = require('koa-router');
const userController = require('src/modules/user/controller');

const router = new Router();

router.get('/me', userController.getCurrent);

module.exports = router.routes();
