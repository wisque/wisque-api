const mongo = require('mongoose');

const account = {
    id: { type: String },
    social_network_id: { type: String },
};

module.exports = mongo.model('Account', new mongo.Schema(account));
