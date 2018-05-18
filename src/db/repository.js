module.exports = function initialize(Model) {
    function wrap(fn) {
        return (...args) => fn(Model, ...args);
    }

    return {
        find: wrap(find),
        findAll: wrap(findAll),
        findById: wrap(findById),
        findOne: wrap(findOne),
        create: wrap(create),
        update: wrap(update),
        remove: wrap(remove),
    };
};

function findAll(Model) {
    return find(Model, {});
}

function find(Model, query) {
    return Model.find(query).then(docs => docs.map(doc => doc.toJSON()));
}

function create(Model, data) {
    return Model.create(data).then(doc => doc.toJSON());
}

function update(Model, query, data) {
    return Model.update(query, data).then(() => findOne(Model, query));
}

function remove(Model, query) {
    return findOne(Model, query).then(doc => doc && Model.remove(query).then(() => ({ id: doc.id })));
}

function findById(Model, id) {
    return Model.findById(id).then(doc => doc && doc.toJSON());
}

function findOne(Model, query) {
    return Model.findOne(query).then(doc => doc && doc.toJSON());
}
