const mongo = require('mongoose');
const accessRequestStatuses = require('./constants');

const accessRequest = {
    event_id: {
        type: String,
        ref: 'Event',
        required: [true, 'Access request should have reference to event'],
    },
    status: {
        type: String,
        enum: Object.values(accessRequestStatuses),
        required: true,
    },
    created_by_account_id: {
        type: String,
        ref: 'Account',
        required: [true, 'Access request should have created by field'],
    },
    updated_by_account_id: {
        type: String,
        ref: 'Account',
        required: [true, 'Access request should have updated by field'],
    },
};

module.exports = mongo.model('AccessRequest', new mongo.Schema(accessRequest, {
    paranoid: true,
    idPrefix: 'areq',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
}));
