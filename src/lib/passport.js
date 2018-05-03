const passport = require('koa-passport');
const FacebookStrategy = require('passport-facebook');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { verifyFacebook, verifyJwt } = require('src/modules/account/service');

const config = require('src/config/env');

const jwtStrategyOptions = {
    jwtFromRequest: ExtractJwt.fromHeader(config.jwt.header),
    secretOrKey: config.jwt.secret,
    issuer: config.jwt.issuer,
    audience: config.jwt.audience,
};

const facebookStrategyOptions = {
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: `${config.buildApiUrl()}${config.facebook.callbackPath}`,
};

passport.use('facebook', new FacebookStrategy(facebookStrategyOptions, verifyFacebook));
passport.use('jwt', new JwtStrategy(jwtStrategyOptions, verifyJwt));

module.exports = passport;
