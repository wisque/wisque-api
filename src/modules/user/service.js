const accountRepository = require('src/modules/account/repository');

module.exports = {
    getCurrent,
};

function getCurrent(accountId) {
    return accountRepository.findOne({ _id: accountId });
}
