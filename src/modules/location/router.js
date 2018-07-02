const Router = require('koa-router');
const { buildParamMiddleware } = require('src/utils/helpers');
const controller = require('./controller');
const locationRepository = require('src/modules/location/model').repository;

const router = new Router();
router.get('/', controller.find);
router.get('/:locationId', controller.findById);
router.post('/', controller.create);
router.put('/:locationId', controller.update);
router.delete('/:locationId', controller.remove);

router.param('locationId', buildParamMiddleware(locationRepository.findById, 'location'));

module.exports = router.routes();
