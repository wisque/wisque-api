const inviteRepository = require('src/modules/event/invite/model').repository;
const inviteStatuses = require('./constants');
const eventService = require('src/modules/event/service');

module.exports = {
    create,
    approve,
    decline,
    cancel,
};

async function create(invite) {
    const inviteDto = {
        eventId: invite.eventId,
        status: inviteStatuses.pending,
        invitedAccountId: invite.invitedAccountId,
        createdByAccountId: invite.createdByAccountId,
    };

    return inviteRepository.create(inviteDto);
}

async function approve({ inviteId, approvedByAccountId, eventId }) {
    const updatedInvite = await inviteRepository.update({ _id: inviteId }, {
        status: inviteStatuses.approved,
        updatedByAccountId: approvedByAccountId,
    });

    await eventService.update(eventId, {
        $push: {
            members: [updatedInvite.invitedAccountId],
        },
        updatedByAccountId: approvedByAccountId,
    });

    return updatedInvite;
}

async function decline({ inviteId, declinedByAccountId }) {
    return inviteRepository.update({ _id: inviteId }, {
        status: inviteStatuses.declined,
        updatedByAccountId: declinedByAccountId,
    });
}

async function cancel({ inviteId, cancelledByAccountId, eventId }) {
    const updatedInvite = await inviteRepository.update({ _id: inviteId }, {
        status: inviteStatuses.cancelled,
        updatedByAccountId: cancelledByAccountId,
    });

    await eventService.update(eventId, {
        $pull: {
            members: [updatedInvite.invitedAccountId],
        },
        updatedByAccountId: cancelledByAccountId,
    });

    return updatedInvite;
}
