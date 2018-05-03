const Event = require('./model');
 
module.exports = async function (ctx, next) {
    const event = new Event(ctx.request.body);

    try {
        await event.validate();

        /** All other validation should be here * */

        await next();
    } catch (validation) {
        const errors = Object.keys(validation.errors);
        const response = { errors: [] };

        for (const error of errors) {
            response.errors.push({
                field: validation.errors[error].path,
                message: validation.errors[error].message,
            });
        }

        ctx.status = 400;
        ctx.body = response;
    }
};
