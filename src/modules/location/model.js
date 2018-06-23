const mongo = require('mongoose');

const location = {
    name: {
        type: String,
        required: [true, 'Access request should have name'],
    },
    address: {
        type: String,
        required: [true, 'Access request should have address'],
    },
    lat: {
        type: Number,
        min: [-90, 'Latitude can not be less -90 degree'],
        max: [90, 'Latitude can not be more than 90 degree'],
        default: 180,
    },
    lng: {
        type: Number,
        min: [-180, 'Longitude can not be less -180 degree'],
        max: [180, 'Longitude can not be more than 180 degree'],
        default: 360,
    },
    account_id: {
        type: String,
        ref: 'Account',
        required: [true, 'Location should have account field'],
    },
};

module.exports = mongo.model('Location', new mongo.Schema(location, {
    paranoid: true,
    idPrefix: 'lctn',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
}));
