const Account = require('./model');

module.exports = {
    getAll,
    create,
    update,
    remove,
    getById,
    findOne,
};

function getAll() {
    return Account.find().then(docs => docs.forEach(doc => doc.toJSON));
}

function create(account) {
    return Account.create(account).then(doc => doc.toJSON());
}

function update(query, data) {
    return Account.update(query, data);
}

function remove(id) {
    return Account.remove({ _id: id });
}

function getById(id) {
    return Account.findOne({ _id: id }).then(doc => doc && doc.toJSON());
}

function findOne(query) {
    return Account.findOne(query).then(doc => doc && doc.toJSON());
}
