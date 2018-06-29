const accessRequestRepository = require('src/modules/event/access-request/model').repository;
const accessRequestStatuses = require('./constants');
const service = require('./service');

module.exports = {
    getAll,
    create,
    update,
};

async function getAll(ctx) {
    ctx.json = await accessRequestRepository.find({ event_id: ctx.state.event.id });
}

async function create(ctx) {
    const {
        event: {
            id: eventId,
        },
    } = ctx.state;

    const {
        id: accountId,
    } = ctx.state.user;

    ctx.json = await service.create({ eventId, createdByAccountId: accountId });
}

async function update(ctx) {
    const {
        accessRequest: {
            id: accessRequestId,
        },
        event: {
            id: eventId,
        },
    } = ctx.state;

    const {
        id: accountId,
    } = ctx.state.user;

    switch (ctx.request.body.status) {
        case accessRequestStatuses.approved:
            ctx.body = await service.approve({ accessRequestId, approvedByAccountId: accountId, eventId });
            break;
        case accessRequestStatuses.declined:
            ctx.body = await service.decline({ accessRequestId, declinedByAccountId: accountId });
            break;
        case accessRequestStatuses.cancelled:
            ctx.body = await service.cancel({ accessRequestId, cancelledByAccountId: accountId, eventId });
            break;
        default:
            throw new Error('Unknown status for access request');
    }
}

