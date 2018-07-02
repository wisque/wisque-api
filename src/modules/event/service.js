const eventRepository = require('src/modules/event/model').repository;
const locationService = require('src/modules/location/service');
const { eventTypes, eventCategories } = require('./constants');

module.exports = {
    find,
    create,
    update,
    remove,
    findById,
};

async function find(query, options) {
    return eventRepository.find(query, options);
}

async function create(event) {
    let { locationId } = event;
    const { createdByAccountId } = event;

    if (event.location) {
        const location = await locationService.create({
            ...event.location,
            createdByAccountId,
        });

        locationId = location.id;
    }

    const eventDto = {
        name: event.name,
        description: event.description,
        type: event.type ? event.type : eventTypes.private,
        category: event.category ? event.category : eventCategories.flatParty,
        startingAt: event.startingAt,
        creatorAttachments: event.creatorAttachments,
        createdByAccountId,
        locationId,
    };

    return eventRepository.create(eventDto);
}

async function update(eventId, eventDto) {
    return eventRepository.update({ _id: eventId }, eventDto);
}

async function remove(eventId) {
    return eventRepository.remove({ id: eventId });
}

async function findById(eventId) {
    return eventRepository.findOne({ id: eventId });
}

