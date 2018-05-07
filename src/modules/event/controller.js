const repository = require('./repository');

module.exports = {
    getAll,
    create,
    update,
    remove,
    getById,
};

async function getAll(ctx) {
    ctx.body = await repository.getAll();
}

async function create(ctx) {
    ctx.body = await repository.create(ctx.request.body);
}

async function update(ctx) {
    ctx.body = await repository.update();
}

async function remove(ctx) {
    ctx.body = await repository.remove(ctx.params.id);
}

function getById(ctx) {
    ctx.body = ctx.state.event;
}
