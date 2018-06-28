const mongo = require('mongoose');
const inviteStatuses = require('./constants');

const invite = {
    event_id: {
        type: String,
        ref: 'Event',
        required: [true, 'Invite should have reference to event'],
    },
    status: {
        type: String,
        enum: Object.values(inviteStatuses),
        required: true,
    },
    invited_account_id: {
        type: String,
        ref: 'Account',
        required: [true, 'Invite should have invited account field'],
    },
    created_by_account_id: {
        type: String,
        ref: 'Account',
        required: [true, 'Invite should have invited account field'],
    },
    updated_by_account_id: {
        type: String,
        ref: 'Account',
        required: [true, 'Invite should have updated by field'],
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
