const locationRepository = require('src/modules/location/model').repository;

module.exports = {
    find,
    create,
    update,
    remove,
    findById,
};

async function find() {
    return locationRepository.find();
}

async function create(location) {
    const locationDto = {
        name: location.name ? location.name : location.address,
        address: location.address,
        lat: location.lat,
        lng: location.lng,
        createdByAccountId: location.createdByAccountId,
    };

    return locationRepository.create(locationDto);
}

async function update(locationId, locationDto) {
    return locationRepository.update({ _id: locationId }, locationDto);
}

async function remove(locationId) {
    return locationRepository.remove({ _id: locationId });
}

async function findById(locationId) {
    return locationRepository.findOne({ id: locationId });
}

