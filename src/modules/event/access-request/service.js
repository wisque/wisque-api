const accessRequestRepository = require('src/modules/event/access-request/model').repository;
const accessRequestStatuses = require('./constants');

module.exports = {
    create,
    approve,
    decline,
};

async function create(eventId, accountId) {
    const accessRequest = {
        event_id: eventId,
        status: accessRequestStatuses.pending,
        created_by_account_id: accountId,
        updated_by_account_id: accountId,
    };
    return accessRequestRepository.create(accessRequest);
}

async function approve(accessRequestId, updatedByAccountId) {
    return updateStatus(accessRequestId, updatedByAccountId, accessRequestStatuses.approved);
}

async function decline(accessRequestId, updatedByAccountId) {
    return updateStatus(accessRequestId, updatedByAccountId, accessRequestStatuses.declined);
}

async function updateStatus(accessRequestId, updatedByAccountId, status) {
    const fieldsForUpdate = {
        updatedByAccountId,
        status,
    };
    return accessRequestRepository.update(
        { _id: accessRequestId },
        { $set: fieldsForUpdate },
    );
}

