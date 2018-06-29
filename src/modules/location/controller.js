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
    const location = ctx.request.body;
    const account = ctx.state.user;
    ctx.json = await locationService.create(location, account);
}

async function update(ctx) {
    const { locationId } = ctx.params;
    const fieldsForUpdate = ctx.request.body;
    ctx.json = await locationService.update(locationId, fieldsForUpdate);
}

async function remove(ctx) {
    const { locationId } = ctx.params;
    ctx.json = await locationService.remove(locationId);
}

function findById(ctx) {
    ctx.json = ctx.state.location;
}

