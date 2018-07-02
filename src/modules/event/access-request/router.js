const Router = require('koa-router');
const { buildParamMiddleware } = require('src/utils/helpers');
const controller = require('./controller');
const accessRequestRepository = require('src/modules/event/access-request/model').repository;
const { validateUpdate } = require('src/modules/event/access-request/validator');

const router = new Router();
router.get('/', controller.find);
router.post('/', controller.create);
router.put('/:accessRequestId/', validateUpdate, controller.update);

router.param('accessRequestId', buildParamMiddleware(accessRequestRepository.findById, 'accessRequest'));

module.exports = router.routes();
