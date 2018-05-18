const accountRepository = require('src/modules/account/model').repository;

module.exports = {
    getCurrent,
};

function getCurrent(accountId) {
    return accountRepository.findOne({ _id: accountId });
}
