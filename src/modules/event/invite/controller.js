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
    const {
        event: {
            id: eventId,
            created_by_account_id: createdByAccountId,
        },
    } = ctx.state;

    const {
        invited_account_id: invitedAccountId,
    } = ctx.request.body;

    ctx.body = await service.create({ invitedAccountId, createdByAccountId, eventId });
}

async function update(ctx) {
    const {
        invite: {
            id: inviteId,
        },
        event: {
            id: eventId,
        },
    } = ctx.state;

    const {
        id: accountId,
    } = ctx.state.user;

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

