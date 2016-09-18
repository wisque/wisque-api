import Party from './parties.model';

export default async function(ctx, next) {
    const party = new Party(ctx.body);

    try {
        await party.validate();
        
        /** All other validation should be here **/

        await next();
    } catch (validation) {
        const errors = Object.keys(validation.errors);
        const response = {errors: []};

        for(const error of errors) {
            response.errors.push({
                field: validation.errors[error].path,
                message: validation.errors[error].message
            });
        }
        
        ctx.status = 400;
        ctx.body = response;
    }
}