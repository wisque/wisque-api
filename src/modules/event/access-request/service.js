const accessRequestRepository = require('src/modules/event/access-request/model').repository;
const accessRequestStatuses = require('./constants');
const eventService = require('src/modules/event/service');

module.exports = {
    create,
    approve,
    decline,
    cancel,
};

async function create({ eventId, createdByAccountId }) {
    const accessRequestDto = {
        eventId,
        createdByAccountId,
        status: accessRequestStatuses.pending,
    };

    return accessRequestRepository.create(accessRequestDto);
}

async function approve({ accessRequestId, approvedByAccountId, eventId }) {
    const updatedAccessRequest = await accessRequestRepository.update({ _id: accessRequestId }, {
        updatedByAccountId: approvedByAccountId,
        status: accessRequestStatuses.approved,
    });

    await eventService.update(eventId, {
        $push: {
            members: [updatedAccessRequest.createdByAccountId],
        },
        updatedByAccountId: approvedByAccountId,
    });

    return updatedAccessRequest;
}

async function decline({ accessRequestId, declinedByAccountId }) {
    return accessRequestRepository.update({ _id: accessRequestId }, {
        updatedByAccountId: declinedByAccountId,
        status: accessRequestStatuses.declined,
    });
}

async function cancel({ accessRequestId, cancelledByAccountId, eventId }) {
    const updatedAccessRequest = await accessRequestRepository.update({ _id: accessRequestId }, {
        updatedByAccountId: cancelledByAccountId,
        status: accessRequestStatuses.cancelled,
    });

    await eventService.update(eventId, {
        $pull: {
            members: [updatedAccessRequest.createdByAccountId],
        },
        updatedByAccountId: cancelledByAccountId,
    });

    return updatedAccessRequest;
}
