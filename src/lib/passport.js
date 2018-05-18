const passport = require('koa-passport');
const FBStrategy = require('passport-facebook');
const { Strategy: VKStrategy } = require('passport-vkontakte');
const FBTokenStrategy = require('passport-facebook-token');
const VKTokenStrategy = require('passport-vkontakte-token');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { verifyFB, verifyVK, verifyJwt } = require('src/modules/account/service');

const config = require('src/config/env');

const jwtStrategyOptions = {
    jwtFromRequest: ExtractJwt.fromHeader(config.jwt.header),
    secretOrKey: config.jwt.secret,
    issuer: config.jwt.issuer,
    audience: config.jwt.audience,
};

const facebookTokenStrategyOptions = {
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    profileFields: [
        'id', 'email', 'birthday', 'gender', 'first_name', 'last_name',
        'location{location}', 'picture.type(large)',
    ],
};

const facebookWebStrategyOptions = {
    ...facebookTokenStrategyOptions,
    callbackURL: `${config.buildApiUrl()}${config.facebook.callbackPath}`,
};

const vkTokenStrategyOptions = {
    clientID: config.vk.clientID,
    clientSecret: config.vk.clientSecret,
    profileFields: [
        'uid', 'first_name', 'last_name', 'sex',
        'photo', 'bdate', 'city', 'country',
        'mobile_phone', 'connections', 'photo_400_orig',
    ],
};


const vkWebStrategyOptions = {
    ...vkTokenStrategyOptions,
    callbackURL: `${config.buildApiUrl()}${config.vk.callbackPath}`,
};

passport.use('facebook-web', new FBStrategy(facebookWebStrategyOptions, verifyFB));
passport.use('facebook-token', new FBTokenStrategy(facebookTokenStrategyOptions, verifyFB));
passport.use('vk-token', new VKTokenStrategy(vkTokenStrategyOptions, verifyVK));
passport.use('vk-web', new VKStrategy(vkWebStrategyOptions, verifyVK));
passport.use('jwt', new JwtStrategy(jwtStrategyOptions, verifyJwt));

module.exports = passport;
