import Router from 'koa-router';
import {buildParamMiddleware} from 'src/utils/helpers';
import * as controller from './parties.controller';
import * as service from './parties.service';
import validator from './parties.validator';

const router = new Router();

router.get('/', controller.getAll);
router.post('/', validator, controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.get('/:id', controller.getById);

router.param('id', buildParamMiddleware(service.getById, 'party'));

export default router.routes();