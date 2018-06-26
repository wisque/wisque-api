const { Validator } = require('src/utils/validation');

module.exports = {
    validateUpdate: new Validator(validateUpdate),
};

async function validateUpdate(ctx) {
    const { event, invite } = ctx.state;
    const account = ctx.state.user;
    if (invite.invited_account_id !== account.id &&
        event.created_by_account_id !== account.id) {
        this.permissionError(
            'updated_by_account_id',
            `Update by account ${account.id} prohibited for invite ${invite.id}`,
        );
    }
}

