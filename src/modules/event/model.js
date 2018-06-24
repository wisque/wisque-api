const mongo = require('src/db');

const event = {
    name: {
        type: String,
        required: [true, 'Event should have name'],
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        required: [true, 'Event should have type'],
    },
    category: {
        type: String,
        required: [true, 'Event should have category'],
    },
    starting_at: {
        type: Number,
        default: 0,
    },
    location_id: {
        type: String,
        ref: 'Location',
        required: [true, 'Event should have location'],
    },
    creator_attachments: [{
        type: String,
        ref: 'Attachment',
    }],
    member_attachments: [{
        type: String,
        ref: 'Attachment',
    }],
    members: [{
        type: String,
        ref: 'Account',
    }],
    created_by_account_id: {
        type: String,
        ref: 'Account',
    },
    updated_by_account_id: {
        type: String,
        ref: 'Account',
    },
};

module.exports = mongo.model('Event', new mongo.Schema(event, {
    paranoid: true,
    idPrefix: 'evnt',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
}));
