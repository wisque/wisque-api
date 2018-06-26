const mongo = require('mongoose');

const invite = {
    event_id: {
        type: String,
        ref: 'Event',
        required: [true, 'Access request should have reference to event'],
    },
    status: {
        type: String,
        required: true,
    },
    invited_account_id: {
        type: String,
        ref: 'Account',
        required: [true, 'Access request should have invited account field'],
    },
    updated_by_account_id: {
        type: String,
        ref: 'Account',
        required: [true, 'Access request should have updated by field'],
    },
};

module.exports = mongo.model('Invite', new mongo.Schema(invite, {
    paranoid: true,
    idPrefix: 'invt',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
}));
