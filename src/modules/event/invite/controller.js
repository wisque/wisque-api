const inviteRepository = require('src/modules/event/invite/model').repository;
const inviteStatuses = require('src/modules/event/invite/constants');
const service = require('./service');

module.exports = {
    find,
    create,
    update,
};

async function find(ctx) {
    ctx.json = await inviteRepository.find({ eventId: ctx.state.event.id });
}

async function create(ctx) {
    const {
        event: {
            id: eventId,
            createdByAccountId,
        },
    } = ctx.state;

    const inviteDto = { ...ctx.request.body, eventId, createdByAccountId };

    ctx.json = await service.create(inviteDto);
}

async function update(ctx) {
    const {
        invite: { id: inviteId },
        event: { id: eventId },
    } = ctx.state;

    const { id: accountId } = ctx.state.user;

    switch (ctx.request.body.status) {
        case inviteStatuses.approved:
            ctx.body = await service.approve({ inviteId, approvedByAccountId: accountId, eventId });
            break;
        case inviteStatuses.declined:
            ctx.body = await service.decline({ inviteId, declinedByAccountId: accountId });
            break;
        case inviteStatuses.cancelled:
            ctx.body = await service.cancel({ inviteId, cancelledByAccountId: accountId, eventId });
            break;
        default:
            throw new Error('Unknown status for invite');
    }
}

