const service = require('src/modules/attachment/service');
const send = require('koa-send');

module.exports = {
    create,
    findById,
    getAttachmentContent,
};

async function create(ctx) {
    const account = ctx.state.user;

    ctx.json = await service.create(Object.values(ctx.request.files), account.id);
}

function findById(ctx) {
    ctx.json = ctx.state.attachment;
}

async function getAttachmentContent(ctx) {
    return send(ctx, ctx.state.attachment.path);
}
