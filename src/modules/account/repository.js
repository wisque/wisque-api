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
    return Account.find();
}

function create(account) {
    return Account.create(account);
}

function update() {
    return Account.update();
}

function remove(id) {
    return Account.remove({ id });
}

function getById(id) {
    return Account.findOne({ id });
}

function findOne(query) {
    return Account.findOne(query);
}
