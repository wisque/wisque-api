import passport from 'src/lib/passport';
import jwt from 'jsonwebtoken';
import config from 'src/config/env';
import * as accountRepository from 'src/modules/account/repository';

export async function verifyFacebook(accessToken, refreshToken, profile, cb) {
    let account = await accountRepository.findOne({ social_network_id: profile.id });

    if (!account) {
        account = await accountRepository.create({ social_network_id: profile.id })
    }

    cb(null, account);
}

export async function verifyJwt(payload, done) {
    let account = await accountRepository.findOne({ _id: payload.accountId });

    done(null, account);
}

export function generateToken(payload) {
    let claims = {
        accountId: payload._id,
        type: payload.type,
    };

    let token = jwt.sign(claims, config.jwt.secret, {
        issuer: config.jwt.issuer,
        audience: config.jwt.audience,
        subject: config.jwt.subject,
        expiresIn: config.jwt.expiresIn,
    });

    return token;
}
