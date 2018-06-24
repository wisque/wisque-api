const accessRequestRepository = require('src/modules/event/access-request/model').repository;
const service = require('./service');

module.exports = {
    getAll,
    create,
    approve,
    decline,
};

async function getAll(ctx) {
    ctx.body = await accessRequestRepository.find({ event_id: ctx.state.event.id });
}

async function create(ctx) {
    const { event } = ctx.state;
    const createdByAccount = ctx.state.user;
    ctx.body = await service.create(event.id, createdByAccount.id);
}

async function approve(ctx) {
    const { accessRequest, event } = ctx.state;
    const updatedByAccount = ctx.state.user;
    ctx.body = await service.approve(accessRequest.id, updatedByAccount.id, event);
}

async function decline(ctx) {
    const { accessRequest } = ctx.state;
    const updatedByAccount = ctx.state.user;
    ctx.body = await service.decline(accessRequest.id, updatedByAccount.id);
}

