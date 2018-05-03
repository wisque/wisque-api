const { generateToken } = require('src/modules/account/service');

module.exports = {
    signin,
};

function signin(ctx) {
    ctx.body = { token: generateToken(ctx.state.user) };
}
