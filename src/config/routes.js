import Router from 'koa-router';
import {versionify} from 'src/utils/helpers';
import { authMiddleware } from 'src/config/controller';
import passport from 'src/lib/passport';
import event from 'src/modules/event/router';
import account from 'src/modules/account/router';

const router = new Router();

router.use(versionify('/accounts'), account);
router.use(authMiddleware);
router.use(versionify('/events'), event);

export default router.routes();