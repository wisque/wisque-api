const attachmentRepository = require('src/modules/attachment/model').repository;
const path = require('path');

module.exports = {
    create,
};

async function create(files, accountId) {
    const attachments = [];

    for (const file of files) {
        const attachment = {
            path: file.path,
            mediaType: file.type,
            originalName: file.name,
            name: getFilename(file),
            extension: getFileExtension(file),
            size: file.size,
            createdByAccountId: accountId,
            updatedByAccountId: accountId,
        };

        attachments.push(attachmentRepository.create(attachment));
    }

    return Promise.all(attachments);
}

function getFilename(file) {
    return path.basename(file.path);
}

function getFileExtension(file) {
    return path.extname(getFilename(file)).substring(1);
}

