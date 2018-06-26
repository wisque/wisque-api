const locationRepository = require('src/modules/location/model').repository;

module.exports = {
    findAll,
    create,
    update,
    remove,
    findById,
};

async function findAll() {
    return locationRepository.findAll();
}

async function create(location, account) {
    const newLocation = {
        name: location.name ? location.name : location.address,
        address: location.address,
        lat: location.lat,
        lng: location.lng,
        account_id: account.id,
    };
    return locationRepository.create(newLocation);
}

async function update(locationId, fieldsForUpdate) {
    return locationRepository.update(
        { _id: locationId },
        { $set: fieldsForUpdate },
    );
}

async function remove(locationId) {
    return locationRepository.remove({ _id: locationId });
}

async function findById(locationId) {
    return locationRepository.findOne({ _id: locationId });
}

