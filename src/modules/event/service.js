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
    const events = await eventRepository.findAll();
    const promises = [];
    events.forEach(event => promises.push(setLocationToEvent(event)));
    await Promise.all(promises);
    return events;
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

    return setLocationToEvent(await eventRepository.create(newEvent));
}

async function update(eventId, accountId, fieldsForUpdate) {
    fieldsForUpdate.updated_by_account_id = accountId;
    const event = await eventRepository.update(
        { _id: eventId },
        { $set: fieldsForUpdate },
    );
    return setLocationToEvent(event);
}

async function remove(eventId) {
    return eventRepository.remove({ id: eventId });
}

async function findById(eventId) {
    const event = await eventRepository.findOne({ _id: eventId });
    return setLocationToEvent(event);
}

async function setLocationToEvent(event) {
    event.location = await locationService.findById(event.location_id);
    return event;
}

