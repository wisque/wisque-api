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
    const accessRequest = {
        event_id: eventId,
        status: accessRequestStatuses.pending,
        created_by_account_id: createdByAccountId,
        updated_by_account_id: createdByAccountId,
    };

    return accessRequestRepository.create(accessRequest);
}

async function approve({ accessRequestId, approvedByAccountId, eventId }) {
    const updatedAccessRequest = await updateStatus(
        accessRequestId,
        approvedByAccountId,
        accessRequestStatuses.approved,
    );

    await eventService.update(eventId, {
        $push: {
            members: [updatedAccessRequest.created_by_account_id],
        },
        updated_by_account_id: approvedByAccountId,
    });

    return updatedAccessRequest;
}

async function decline({ accessRequestId, declinedByAccountId }) {
    return updateStatus(accessRequestId, declinedByAccountId, accessRequestStatuses.declined);
}

async function cancel({ accessRequestId, cancelledByAccountId, eventId }) {
    const updatedAccessRequest = await updateStatus(
        accessRequestId,
        cancelledByAccountId,
        accessRequestStatuses.cancelled,
    );

    await eventService.update(eventId, {
        $pull: {
            members: [updatedAccessRequest.created_by_account_id],
        },
        updated_by_account_id: cancelledByAccountId,
    });

    return updatedAccessRequest;
}

async function updateStatus(accessRequestId, updatedByAccountId, status) {
    const fieldsForUpdate = {
        updated_by_account_id: updatedByAccountId,
        status,
    };
    return accessRequestRepository.update(
        { _id: accessRequestId },
        fieldsForUpdate,
    );
}

