const accessRequestRepository = require('src/modules/event/access-request/model').repository;
const accessRequestStatuses = require('./constants');
const service = require('./service');

module.exports = {
    getAll,
    create,
    update,
};

async function getAll(ctx) {
    ctx.body = await accessRequestRepository.find({ event_id: ctx.state.event.id });
}

async function create(ctx) {
    const { event } = ctx.state;
    const createdByAccount = ctx.state.user;
    ctx.body = await service.create(event.id, createdByAccount.id);
}

async function update(ctx) {
    const { accessRequest, event } = ctx.state;
    const updatedByAccount = ctx.state.user;

    switch (ctx.request.body.status) {
        case accessRequestStatuses.approved:
            ctx.body = await service.approve(accessRequest.id, updatedByAccount.id, event);
            break;
        case accessRequestStatuses.declined:
            ctx.body = await service.decline(accessRequest.id, updatedByAccount.id);
            break;
        case accessRequestStatuses.cancelled:
            ctx.body = await service.cancel(accessRequest.id, updatedByAccount.id, event);
            break;
        default:
            break;
    }
}

