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
    if (event.location) {
        const newLocation = await locationService.create(event.location, account);
        event.location_id = newLocation.id;
        delete event.location;
    }

    const newEvent = {
        name: event.name,
        description: event.description,
        type: eventTypes.private,
        category: event.category ? event.category : eventCategories.flatParty,
        starting_at: event.starting_at,
        location_id: event.location_id,
        creator_attachments: event.creator_attachments,
        created_by_account_id: account.id,
        updated_by_account_id: account.id,
    };

    return eventRepository.create(newEvent);
}

async function update(eventId, fieldsForUpdate) {
    if (!fieldsForUpdate.updated_by_account_id) {
        throw new Error('You must specify updated_by_account_id for each update');
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

