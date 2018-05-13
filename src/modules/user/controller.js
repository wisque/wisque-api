const userService = require('src/modules/user/service');

module.exports = {
    getCurrent,
};

async function getCurrent(ctx) {
    ctx.body = await userService.getCurrent(ctx.state.user.id);
}
