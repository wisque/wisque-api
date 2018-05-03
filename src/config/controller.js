import passport from 'src/lib/passport';

export async function authMiddleware(ctx, next) {
    await passport.authenticate('jwt', { session: false }, async function (err, account, additionalError) {
        if (err) {
            await next(err); // handle error passed from password-jwt in strange way (as 3rd parameter)
        } else if (additionalError instanceof Error) {
            if (additionalError) {
                ctx.status = 403;
                ctx.body = { errors: [{
                    jwt: additionalError.message
                }]};
            }
        } else {
            if (account) {
                ctx.state.user = account;

                await next();
            } else {
                ctx.status = 403;
                ctx.body = { errors: [{
                    jwt: 'Invalid token'
                }]};
            };
        }
    })(ctx, next);
}; 
