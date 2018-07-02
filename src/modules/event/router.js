const Router = require('koa-router');
const controller = require('src/modules/event/controller');
const eventRepository = require('src/modules/event/model').repository;
const { validateCreate, validateUpdate } = require('src/modules/event/validator');
const accessRequestRouter = require('src/modules/event/access-request/router');
const inviteRouter = require('src/modules/event/invite/router');
const attachmentRouter = require('src/modules/event/attachment/router');

const router = new Router();

router.get('/', controller.find);
router.post('/', validateCreate, controller.create);
router.put('/:eventId', validateUpdate, controller.update);
router.delete('/:eventId', controller.remove);
router.get('/:eventId', controller.findById);

router.use('/:eventId/access-requests', accessRequestRouter);
router.use('/:eventId/invites', inviteRouter);
router.use('/:eventId/attachments', attachmentRouter);

router.param('eventId', async (id, ctx, next) => {
    ctx.state.event = await eventRepository.findById(id, { extend: ctx.query.extend });

    await next();
});

module.exports = router.routes();
