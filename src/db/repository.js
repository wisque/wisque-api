module.exports = function initialize(Model) {
    function wrap(fn) {
        return (...args) => fn(Model, ...args);
    }

    return {
        find: wrap(find),
        findById: wrap(findById),
        findOne: wrap(findOne),
        create: wrap(create),
        update: wrap(update),
        remove: wrap(remove),
    };
};

function find(Model, query, options = {}) {
    return Model.find(query)
        .populate(Model.extend ? Model.extend(options.extend) : '')
        .then(docs => docs.map(doc => doc.toJSON()));
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

function findById(Model, id, options = {}) {
    return Model.findById(id)
        .populate(Model.extend ? Model.extend(options.extend) : '')
        .then(doc => doc && doc.toJSON());
}

function findOne(Model, query, options = {}) {
    return Model.findOne(query)
        .populate(Model.extend ? Model.extend(options.extend) : '')
        .then(doc => doc && doc.toJSON());
}
