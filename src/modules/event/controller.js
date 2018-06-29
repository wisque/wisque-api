const eventService = require('src/modules/event/service');

module.exports = {
    findAll,
    create,
    update,
    remove,
    findById,
};

async function findAll(ctx) {
    ctx.json = await eventService.findAll();
}

async function create(ctx) {
    const event = ctx.request.body;
    const account = ctx.state.user;

    ctx.json = await eventService.create(event, account);
}

async function update(ctx) {
    const { eventId } = ctx.params;
    const fieldsForUpdate = ctx.request.body;

    fieldsForUpdate.updatedByAccountId = ctx.state.user.id;

    ctx.json = await eventService.update(eventId, fieldsForUpdate);
}

async function remove(ctx) {
    const eventId = ctx.params.id;

    ctx.json = await eventService.remove(eventId);
}

function findById(ctx) {
    ctx.json = ctx.state.event;
}
