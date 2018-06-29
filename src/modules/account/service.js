const jwt = require('jsonwebtoken');
const config = require('src/config/env');
const accountRepository = require('src/modules/account/model').repository;
const vkConstants = require('src/constants/vk');

module.exports = {
    verifyFB,
    verifyJwt,
    generateToken,
    verifyVK,
};

async function verifyVK(accessToken, refreshToken, profile, cb) {
    const accountQuery = { socialNetworkId: profile.id, network: 'vk' };
    let account = await accountRepository.findOne(accountQuery);

    const profileDto = mapVKFields(profile._json);

    if (!account) {
        account = await accountRepository.create(profileDto);
    } else {
        account = await accountRepository.update(accountQuery, profileDto);
    }

    cb(null, { id: account.id });
}

function mapVKFields(profile) {
    return {
        socialNetworkId: profile.id,
        network: 'vk',
        country: vkConstants.countries[profile.country],
        gender: vkConstants.genders[profile.sex] || 'unknown',
        firstName: profile.first_name,
        lastName: profile.last_name,
        photo: profile.photo_400_orig,
        email: profile.email,
        birthday: (profile.bdate || '').replace(/\./g, '/'),
    };
}

async function verifyFB(accessToken, refreshToken, profile, cb) {
    const accountQuery = { socialNetworkId: profile.id, network: 'fb' };
    let account = await accountRepository.findOne(accountQuery);

    const profileDto = mapFBFields(profile._json);

    if (!account) {
        account = await accountRepository.create(profileDto);
    } else {
        account = await accountRepository.update(accountQuery, profileDto);
    }

    cb(null, { id: account.id });
}

function mapFBFields(profile) {
    return {
        socialNetworkId: profile.id,
        network: 'fb',
        country: profile.location.location.country,
        gender: profile.gender || 'unknown',
        firstName: profile.first_name,
        lastName: profile.last_name,
        photo: profile.picture.data.url,
        email: profile.email,
        birthday: profile.birthday,
    };
}

async function verifyJwt(payload, done) {
    const account = await accountRepository.findOne({ _id: payload.accountId });

    done(null, account);
}

function generateToken(payload) {
    const claims = {
        accountId: payload.id,
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
