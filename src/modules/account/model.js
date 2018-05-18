const mongo = require('src/db');

const account = {
    social_network_id: { type: String },
    network: { type: String },
    gender: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    photo: { type: String },
    email: { type: String },
    country: { type: String },
    birthday: { type: String },
};

module.exports = mongo.model('Account', new mongo.Schema(account, {
    paranoid: true,
    idPrefix: 'acct',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
}));
