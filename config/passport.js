const passport = require('passport');
const jwt = require('jsonwebtoken');
const BearerStrategy = require('passport-http-bearer');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const socialMedias = require('./socialMedias');
const config = require('./config');

passport.use(new BearerStrategy((token, done) => {
    try {
        const user = jwt.verify(token, config.jwtSecret);
        return done(null, user, { scope: 'read' });
    } catch (e) {
        return done(null, false);
    }
}));

passport.use(new FacebookStrategy({
    clientID: socialMedias.facebook[process.env.APP_ENV].clientID,
    clientSecret: socialMedias.facebook[process.env.APP_ENV].clientSecret,
    callbackURL: socialMedias.facebook[process.env.APP_ENV].callbackURL,
    profileFields: ['id', 'emails', 'name', 'picture'],
}, (accessToken, refreshToken, profile, done) => (profile ? done(null, profile) : done(null))));

passport.use(new GoogleStrategy({
    clientID: socialMedias.google[process.env.APP_ENV].clientID,
    clientSecret: socialMedias.google[process.env.APP_ENV].clientSecret,
    callbackURL: socialMedias.google[process.env.APP_ENV].callbackURL,
}, async (request, accessToken, refreshToken, profile, done) => {
    return profile ? done(null, profile) : done(null);
}));

module.exports = passport;
