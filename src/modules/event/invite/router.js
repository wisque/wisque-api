const Router = require('koa-router');
const { buildParamMiddleware } = require('src/utils/helpers');
const controller = require('./controller');
const inviteRepository = require('src/modules/event/invite/model').repository;
const { validateUpdate } = require('src/modules/event/invite/validator');

const router = new Router();
router.get('/', controller.find);
router.post('/', controller.create);
router.put('/:inviteId/', validateUpdate, controller.update);

router.param('inviteId', buildParamMiddleware(inviteRepository.findById, 'invite'));

module.exports = router.routes();
