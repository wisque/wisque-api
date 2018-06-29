const mongo = require('mongoose');
const accessRequestStatuses = require('./constants');

const accessRequest = {
    eventId: {
        type: String,
        ref: 'Event',
        required: [true, 'Access request should have reference to event'],
    },
    status: {
        type: String,
        enum: Object.values(accessRequestStatuses),
        required: true,
    },
    createdByAccountId: {
        type: String,
        ref: 'Account',
        required: [true, 'Access request should have created by field'],
    },
    updatedByAccountId: {
        type: String,
        ref: 'Account',
        required: [true, 'Access request should have updated by field'],
    },
};

module.exports = mongo.model('AccessRequest', new mongo.Schema(accessRequest, {
    paranoid: true,
    idPrefix: 'areq',
    timestamps: true,
}));
