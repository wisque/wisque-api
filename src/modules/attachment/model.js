const mongo = require('src/db');

const attachment = {
    media_type: {
        type: String,
        required: [true, 'Attachment should have media type'],
    },
    extension: {
        type: String,
        required: [true, 'Attachment should have extension'],
    },
    name: {
        type: String,
        required: [true, 'Attachment should have name'],
    },
    original_name: {
        type: String,
        required: [true, 'Attachment should have original name'],
    },
    path: {
        type: String,
        required: [true, 'Attachment should have path'],
    },
    size: {
        type: Number,
        min: [0, 'Attachment size cannot be less than 0'],
        max: [4 * 1024 * 1024, 'Attachment size cannot be more than 4 MB'],
        default: 0,
    },
    created_by_account_id: {
        type: String,
        ref: 'Account',
    },
    updated_by_account_id: {
        type: String,
        ref: 'Account',
    },
};

module.exports = mongo.model('Attachment', new mongo.Schema(attachment, {
    paranoid: true,
    idPrefix: 'atch',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
}));
