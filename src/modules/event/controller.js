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
    const event = ctx.request.body;
    ctx.body = await eventService.update(event);
}

async function remove(ctx) {
    const eventId = ctx.params.id;
    ctx.body = await eventService.remove(eventId);
}

function findById(ctx) {
    ctx.body = ctx.state.event;
}
