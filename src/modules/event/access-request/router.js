const Router = require('koa-router');
const { buildParamMiddleware } = require('src/utils/helpers');
const controller = require('./controller');
const accessRequestRepository = require('src/modules/event/access-request/model').repository;
const { validateUpdate } = require('src/modules/event/access-request/validator');

const router = new Router();
router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:accessRequestId/approve', validateUpdate, controller.approve);
router.put('/:accessRequestId/decline', validateUpdate, controller.decline);

router.param('accessRequestId', buildParamMiddleware(accessRequestRepository.findById, 'accessRequest'));

module.exports = router.routes();