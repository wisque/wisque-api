const locationService = require('src/modules/location/service');

module.exports = {
    findAll,
    create,
    update,
    remove,
    findById,
};

async function findAll(ctx) {
    ctx.body = await locationService.findAll();
}

async function create(ctx) {
    const location = ctx.request.body;
    const account = ctx.state.user;
    ctx.body = await locationService.create(location, account);
}

async function update(ctx) {
    const { locationId } = ctx.params;
    const fieldsForUpdate = ctx.request.body;
    ctx.body = await locationService.update(locationId, fieldsForUpdate);
}

async function remove(ctx) {
    const { locationId } = ctx.params;
    ctx.body = await locationService.remove(locationId);
}

function findById(ctx) {
    ctx.body = ctx.state.location;
}

