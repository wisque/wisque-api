const Router = require('koa-router');
const { buildParamMiddleware } = require('src/utils/helpers');
const controller = require('src/modules/event/controller');
const eventRepository = require('src/modules/event/model').repository;
const { validateCreate, validateUpdate } = require('src/modules/event/validator');
const accessRequestRouter = require('src/modules/event/access-request/router');

const router = new Router();

router.get('/', controller.findAll);
router.post('/', validateCreate, controller.create);
router.put('/:eventId', validateUpdate, controller.update);
router.delete('/:eventId', controller.remove);
router.get('/:eventId', controller.findById);
router.use('/:eventId/access-requests', accessRequestRouter);

router.param('eventId', buildParamMiddleware(eventRepository.findById, 'event'));

module.exports = router.routes();
