const { Validator } = require('src/utils/validation');

module.exports = {
    validateCreate: new Validator(validateCreate),
    validateUpdate: new Validator(validateUpdate),
};

async function validateCreate() {
    // add create logic
}

async function validateUpdate() {
    // add update logic
}
