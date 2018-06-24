const eventService = require('src/modules/event/service');

module.exports = {
    findAll,
    createPrivate,
    update,
    remove,
    findById,
};

async function findAll(ctx) {
    ctx.body = await eventService.findAll();
}

async function createPrivate(ctx) {
    const event = ctx.request.body;
    const account = ctx.state.user;
    ctx.body = await eventService.createPrivate(event, account);
}

async function update(ctx) {
    const { eventId } = ctx.params;
    const fieldsForUpdate = ctx.request.body;
    const accountId = ctx.state.user.id;
    ctx.body = await eventService.update(eventId, accountId, fieldsForUpdate);
}

async function remove(ctx) {
    const eventId = ctx.params.id;
    ctx.body = await eventService.remove(eventId);
}

function findById(ctx) {
    ctx.body = ctx.state.event;
}
