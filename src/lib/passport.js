import passport from 'koa-passport';
import FacebookStrategy from 'passport-facebook';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { verifyFacebook, verifyJwt } from 'src/modules/account/service';

import config from 'src/config/env';

const jwtStrategyOptions = {
    jwtFromRequest: ExtractJwt.fromHeader(config.jwt.header),
    secretOrKey: config.jwt.secret,
    issuer: config.jwt.issuer,
    audience: config.jwt.audience,
};

const facebookStrategyOptions = {
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: `${config.buildApiUrl()}${config.facebook.callbackPath}`
};

passport.use('facebook', new FacebookStrategy(facebookStrategyOptions, verifyFacebook));
passport.use('jwt', new JwtStrategy(jwtStrategyOptions, verifyJwt));

export default passport;