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
    await updateStatus(ctx, service.approve);
}

async function decline(ctx) {
    await updateStatus(ctx, service.decline);
}

async function updateStatus(ctx, updateStatusCallback) {
    const { accessRequest } = ctx.state;
    const updatedByAccount = ctx.state.user;
    ctx.body = await updateStatusCallback(accessRequest.id, updatedByAccount.id);
}

