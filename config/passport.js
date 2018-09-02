const passport = require('passport');
const jwt = require('jsonwebtoken');
const BearerStrategy = require('passport-http-bearer');
const config = require('./config');

passport.use(new BearerStrategy((token, done) => {
    try {
        const user = jwt.verify(token, config.jwtSecret);
        return done(null, user, { scope: 'read' });
    } catch (e) {
        return done(null, false);
    }
}));

module.exports = passport;
