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
    ctx.body = await eventRepository.create(ctx.request.body);
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
