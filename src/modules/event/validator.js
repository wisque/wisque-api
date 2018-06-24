const { Validator } = require('src/utils/validation');

module.exports = {
    validateCreate: new Validator(validateCreate),
    validateUpdate: new Validator(validateUpdate),
};

async function validateCreate() {
    // const { body } = ctx.request;

    // if (!body.title) {
    //     this.validationError('title', 'Title is required');
    // }
    //
    // if (!body.lat) {
    //     this.validationError('lat', 'Latitude is required');
    // }
    //
    // if (!body.lng) {
    //     this.validationError('lat', 'Longitude is required');
    // }
}

async function validateUpdate() {
    // add update logic
}
