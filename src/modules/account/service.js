const jwt = require('jsonwebtoken');
const config = require('src/config/env');
const accountRepository = require('src/modules/account/repository');

module.exports = {
    verifyFacebook,
    verifyJwt,
    generateToken,
};

async function verifyFacebook(accessToken, refreshToken, profile, cb) {
    let account = await accountRepository.findOne({ social_network_id: profile.id });

    if (!account) {
        account = await accountRepository.create({ social_network_id: profile.id });
    }

    cb(null, account);
}

async function verifyJwt(payload, done) {
    const account = await accountRepository.findOne({ _id: payload.accountId });

    done(null, account);
}

function generateToken(payload) {
    const claims = {
        // eslint-disable-next-line no-underscore-dangle
        accountId: payload._id,
        type: payload.type,
    };

    const token = jwt.sign(claims, config.jwt.secret, {
        issuer: config.jwt.issuer,
        audience: config.jwt.audience,
        subject: config.jwt.subject,
        expiresIn: config.jwt.expiresIn,
    });

    return token;
}
