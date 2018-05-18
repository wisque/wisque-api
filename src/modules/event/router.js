const Router = require('koa-router');
const { buildParamMiddleware } = require('src/utils/helpers');
const controller = require('src/modules/event/controller');
const eventRepository = require('src/modules/event/model').repository;
const { validateCreate, validateUpdate } = require('src/modules/event/validator');

const router = new Router();

router.get('/', controller.findAll);
router.post('/', validateCreate, controller.create);
router.put('/:id', validateUpdate, controller.update);
router.delete('/:id', controller.remove);
router.get('/:id', controller.findById);

router.param('id', buildParamMiddleware(eventRepository.findById, 'event'));

module.exports = router.routes();
