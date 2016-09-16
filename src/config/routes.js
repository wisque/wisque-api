import Router from 'koa-router';
import resources from 'src/resources';
import versionify from 'src/utils/helpers';

const router = new Router();

router.use(versionify('/parties'), resources.parties);

export default router.routes();