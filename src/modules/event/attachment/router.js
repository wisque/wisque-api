const Router = require('koa-router');
const { buildParamMiddleware } = require('src/utils/helpers');
const controller = require('src/modules/event/attachment/controller');
const attachmentRepository = require('src/modules/attachment/model').repository;
const { validateCreate } = require('src/modules/event/attachment/validator');

const koaBody = require('koa-body')({
    formidable: {
        uploadDir: 'public/uploads', // upload directory
        keepExtensions: true, // keep file extensions
    },
    multipart: true,
    urlencoded: true,
});

const router = new Router();

router.post('/', validateCreate, koaBody, controller.create);
router.get('/:attachmentId', controller.findById);
router.get('/:attachmentId/content', controller.getAttachmentContent);

router.param('attachmentId', buildParamMiddleware(attachmentRepository.findById, 'attachment'));

module.exports = router.routes();
