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
    const { id: createdByAccountId } = ctx.state.user;
    const eventDto = { ...ctx.request.body, createdByAccountId };

    ctx.json = await eventService.create(eventDto);
}

async function update(ctx) {
    const { eventId } = ctx.params;
    const { id: updatedByAccountId } = ctx.state.user;
    const eventDto = { ...ctx.request.body, updatedByAccountId };

    ctx.json = await eventService.update(eventId, eventDto);
}

async function remove(ctx) {
    const eventId = ctx.params.id;

    ctx.json = await eventService.remove(eventId);
}

function findById(ctx) {
    ctx.json = ctx.state.event;
}
