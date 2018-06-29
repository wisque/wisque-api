const mongo = require('mongoose');
const inviteStatuses = require('./constants');

const invite = {
    eventId: {
        type: String,
        ref: 'Event',
        required: [true, 'Invite should have reference to event'],
    },
    status: {
        type: String,
        enum: Object.values(inviteStatuses),
        required: true,
    },
    invitedAccountId: {
        type: String,
        ref: 'Account',
        required: [true, 'Invite should have invited account field'],
    },
    createdByAccountId: {
        type: String,
        ref: 'Account',
        required: [true, 'Invite should have invited account field'],
    },
    updatedByAccountId: {
        type: String,
        ref: 'Account',
        required: [true, 'Invite should have updated by field'],
    },
};

module.exports = mongo.model('Invite', new mongo.Schema(invite, {
    paranoid: true,
    idPrefix: 'invt',
    timestamps: true,
}));
