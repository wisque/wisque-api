import Router from 'koa-router';
import {versionify} from 'src/utils/helpers';

import event from 'src/modules/event/router';

const router = new Router();

router.use(versionify('/events'), event);

export default router.routes();