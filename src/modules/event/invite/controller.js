const inviteRepository = require('src/modules/event/invite/model').repository;
const inviteStatuses = require('src/modules/event/invite/constants');
const service = require('./service');

module.exports = {
    getAll,
    create,
    update,
};

async function getAll(ctx) {
    ctx.body = await inviteRepository.find({ event_id: ctx.state.event.id });
}

async function create(ctx) {
    const { event } = ctx.state;
    const invite = ctx.request.body;
    ctx.body = await service.create(invite, event);
}

async function update(ctx) {
    const { invite, event } = ctx.state;
    const updatedByAccount = ctx.state.user;

    switch (ctx.request.body.status) {
        case inviteStatuses.approved:
            ctx.body = await service.approve(invite.id, updatedByAccount.id, event);
            break;
        case inviteStatuses.declined:
            ctx.body = await service.decline(invite.id, updatedByAccount.id);
            break;
        case inviteStatuses.cancelled:
            ctx.body = await service.cancel(invite.id, updatedByAccount.id, event);
            break;
        default:
            break;
    }
}

