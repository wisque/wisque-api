const eventRepository = require('src/modules/event/model').repository;
const locationService = require('src/modules/location/service');
const { eventTypes, eventCategories } = require('./constants');

module.exports = {
    findAll,
    createPrivate,
    update,
    remove,
    findById,
};

async function findAll() {
    return eventRepository.findAll();
}

async function createPrivate(event, account) {
    let { locationId } = event;

    if (event.location) {
        const location = await locationService.create(event.location, account);
        
        locationId = location.id;
    }

    const newEvent = {
        name: event.name,
        description: event.description,
        type: eventTypes.private,
        category: event.category ? event.category : eventCategories.flatParty,
        startingAt: event.startingAt,
        creatorAttachments: event.creatorAttachments,
        createdByAccountId: account.id,
        updatedByAccountId: account.id,
        locationId,
    };

    return eventRepository.create(newEvent);
}

async function update(eventId, fieldsForUpdate) {
    if (!fieldsForUpdate.updatedByAccountId) {
        throw new Error('You must specify updatedByAccountId for each update');
    }

    return eventRepository.update(
        { _id: eventId },
        fieldsForUpdate,
    );
}

async function remove(eventId) {
    return eventRepository.remove({ id: eventId });
}

async function findById(eventId) {
    return eventRepository.findOne({ id: eventId });
}

