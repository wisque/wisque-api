const mongo = require('src/db');

const account = {
    socialNetworkId: { type: String },
    network: { type: String },
    gender: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    photo: { type: String },
    email: { type: String },
    country: { type: String },
    birthday: { type: String },
};

module.exports = mongo.model('Account', new mongo.Schema(account, {
    paranoid: true,
    idPrefix: 'acct',
    timestamps: true,
}));
