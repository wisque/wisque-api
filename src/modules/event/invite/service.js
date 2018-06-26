const inviteRepository = require('src/modules/event/invite/model').repository;
const inviteStatuses = require('./constants');
const eventService = require('src/modules/event/service');

module.exports = {
    create,
    approve,
    decline,
    cancel,
};

async function create(invite, event) {
    const newInvite = {
        event_id: event.id ? event.id : invite.event_id,
        status: inviteStatuses.pending,
        invited_account_id: invite.invited_account_id,
        updated_by_account_id: event.created_by_account_id,
    };
    return inviteRepository.create(newInvite);
}

async function approve(inviteId, updatedByAccountId, event) {
    const updatedInvite = await updateStatus(
        inviteId,
        updatedByAccountId,
        inviteStatuses.approved,
    );

    if (updatedInvite.status === inviteStatuses.approved &&
        !event.members.includes(updatedInvite.invited_account_id)) {
        event.members.push(updatedInvite.invited_account_id);

        const fieldsForUpdate = {
            members: event.members,
        };

        await eventService.update(event.id, updatedByAccountId, fieldsForUpdate);
    }

    return updatedInvite;
}

async function decline(inviteId, updatedByAccountId) {
    return updateStatus(inviteId, updatedByAccountId, inviteStatuses.declined);
}

async function cancel(inviteId, updatedByAccountId, event) {
    const updatedInvite = await updateStatus(
        inviteId,
        updatedByAccountId,
        inviteStatuses.cancelled,
    );

    if (updatedInvite.status === inviteStatuses.cancelled &&
        event.members.includes(updatedInvite.invited_account_id)) {
        event.members.pop(updatedInvite.invited_account_id);

        const fieldsForUpdate = {
            members: event.members,
        };

        await eventService.update(event.id, updatedByAccountId, fieldsForUpdate);
    }

    return updatedInvite;
}

async function updateStatus(inviteId, updatedByAccountId, status) {
    const fieldsForUpdate = {
        updatedByAccountId,
        status,
    };
    return inviteRepository.update(
        { _id: inviteId },
        { $set: fieldsForUpdate },
    );
}

