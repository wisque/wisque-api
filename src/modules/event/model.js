const mongo = require('src/db');
const extend = require('src/modules/event/query/extend');

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
    startingAt: {
        type: Number,
        default: 0,
    },
    locationId: {
        type: String,
        ref: 'Location',
        required: [true, 'Event should have location'],
    },
    creatorAttachments: [{
        type: String,
        ref: 'Attachment',
    }],
    memberAttachments: [{
        type: String,
        ref: 'Attachment',
    }],
    members: [{
        type: String,
        ref: 'Account',
    }],
    createdByAccountId: {
        type: String,
        ref: 'Account',
        required: [true, 'Event should have createdByAccountId field'],
    },
    updatedByAccountId: {
        type: String,
        ref: 'Account',
    },
};

const Event = mongo.model('Event', new mongo.Schema(event, {
    paranoid: true,
    idPrefix: 'evnt',
    timestamps: true,
}));

Event.extend = extend;

module.exports = Event;
