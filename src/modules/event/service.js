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
        event.locationId = newLocation.id;
        delete event.location;
    }

    const newEvent = {
        name: event.name,
        description: event.description,
        type: eventTypes.private,
        category: event.category ? event.category : eventCategories.flatParty,
        starting_at: getDateFromTimestamp(event.startingAt),
        location_id: event.locationId,
        creator_attachments: event.creatorAttachments,
        created_by_account_id: account.id,
        updated_by_account_id: account.id,
    };

    return eventRepository.create(newEvent);
}

async function update(event) {
    return eventRepository.update(
        { _id: event.id },
        { $set: event },
    );
}

async function remove(eventId) {
    return eventRepository.remove({ id: eventId });
}

async function findById(eventId) {
    return eventRepository.findOne({ id: eventId });
}

function getDateFromTimestamp(timestamp) {
    const date = new Date();
    date.setTime(timestamp);
    return date;
}
