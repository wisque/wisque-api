const Router = require('koa-router');
const { buildParamMiddleware } = require('src/utils/helpers');
const controller = require('./controller');
const repository = require('./repository');
const validator = require('./validator');

const router = new Router();

router.get('/', controller.getAll);
router.post('/', validator, controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.get('/:id', controller.getById);

router.param('id', buildParamMiddleware(repository.getById, 'event'));

module.exports = router.routes();
