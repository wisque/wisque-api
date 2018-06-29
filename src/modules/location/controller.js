const locationService = require('src/modules/location/service');

module.exports = {
    findAll,
    create,
    update,
    remove,
    findById,
};

async function findAll(ctx) {
    ctx.json = await locationService.findAll();
}

async function create(ctx) {
    const { id: createdByAccountId } = ctx.state.user;
    const locationDto = { ...ctx.request.body, createdByAccountId };

    ctx.json = await locationService.create(locationDto);
}

async function update(ctx) {
    const { locationId } = ctx.params;
    const { id: updatedByAccountId } = ctx.state.user;
    const locationDto = { ...ctx.request.body, updatedByAccountId };

    ctx.json = await locationService.update(locationId, locationDto);
}

async function remove(ctx) {
    const { locationId } = ctx.params;
    ctx.json = await locationService.remove(locationId);
}

function findById(ctx) {
    ctx.json = ctx.state.location;
}

