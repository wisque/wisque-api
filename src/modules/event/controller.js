const eventRepository = require('src/modules/event/model').repository;

module.exports = {
    findAll,
    create,
    update,
    remove,
    findById,
};

async function findAll(ctx) {
    ctx.body = await eventRepository.findAll();
}

async function create(ctx) {
    const event = ctx.request.body;
    event.created_by_account_id = ctx.state.user.id;
    ctx.body = await eventRepository.create(event);
}

async function update(ctx) {
    ctx.body = await eventRepository.update();
}

async function remove(ctx) {
    ctx.body = await eventRepository.remove({ _id: ctx.params.id });
}

function findById(ctx) {
    ctx.body = ctx.state.event;
}
