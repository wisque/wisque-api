const service = require('./service');
const send = require('koa-send');

module.exports = {
    create,
    findById,
    getAttachmentContent,
};

async function create(ctx) {
    const account = ctx.state.user;
    ctx.body = await service.create(Object.values(ctx.request.files), account.id);
}

function findById(ctx) {
    ctx.body = ctx.state.attachment;
}

async function getAttachmentContent(ctx) {
    return send(ctx, ctx.state.attachment.path);
}
