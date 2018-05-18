const Event = require('./model');

module.exports = {
    getAll,
    create,
    update,
    remove,
    getById,
};

async function getAll() {
    return Event.find();
}

async function create(event) {
    return Event.create(event);
}

async function update(query, data) {
    return Event.update(query, data);
}

async function remove(id) {
    return Event.deleteOne({ _id: id });
}

function getById(id) {
    return Event.findById(id);
}
