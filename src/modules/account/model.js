const mongo = require('src/db');

const account = {
    social_network_id: { type: String },
};

module.exports = mongo.model('Account', new mongo.Schema(account, {
    paranoid: true,
    idPrefix: 'acct',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
}));
