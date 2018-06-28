const inviteRepository = require('src/modules/event/invite/model').repository;
const inviteStatuses = require('./constants');
const eventService = require('src/modules/event/service');

module.exports = {
    create,
    approve,
    decline,
    cancel,
};

async function create({ invitedAccountId, createdByAccountId, eventId }) {
    const newInvite = {
        event_id: eventId,
        status: inviteStatuses.pending,
        invited_account_id: invitedAccountId,
        created_by_account_id: createdByAccountId,
        updated_by_account_id: createdByAccountId,
    };

    return inviteRepository.create(newInvite);
}

async function approve({ inviteId, approvedByAccountId, eventId }) {
    const updatedInvite = await updateInviteStatus(
        inviteId,
        approvedByAccountId,
        inviteStatuses.approved,
    );

    await eventService.update(eventId, {
        $push: {
            members: [updatedInvite.invited_account_id],
        },
        updated_by_account_id: approvedByAccountId,
    });

    return updatedInvite;
}

async function decline({ inviteId, declinedByAccountId }) {
    return updateInviteStatus(inviteId, declinedByAccountId, inviteStatuses.declined);
}

async function cancel({ inviteId, cancelledByAccountId, eventId }) {
    const updatedInvite = await updateInviteStatus(
        inviteId,
        cancelledByAccountId,
        inviteStatuses.cancelled,
    );

    await eventService.update(eventId, {
        $pull: {
            members: [updatedInvite.invited_account_id],
        },
        updated_by_account_id: cancelledByAccountId,
    });

    return updatedInvite;
}

async function updateInviteStatus(inviteId, updatedByAccountId, status) {
    const fieldsForUpdate = {
        updated_by_account_id: updatedByAccountId,
        status,
    };

    return inviteRepository.update(
        { _id: inviteId },
        { $set: fieldsForUpdate },
    );
}

