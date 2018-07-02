const { Validator } = require('src/utils/validation');

module.exports = {
    validateUpdate: new Validator(validateUpdate),
};

async function validateUpdate(ctx) {
    const { event, accessRequest } = ctx.state;
    const account = ctx.state.user;

    if (accessRequest.createdByAccountId !== account.id &&
        event.createdByAccountId !== account.id) {
        this.permissionError(
            'updatedByAccountId',
            `Update by account ${account.id} prohibited for access request ${accessRequest.id}`,
        );
    }
}

