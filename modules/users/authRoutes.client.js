const router = require('express').Router();
const passport = require('../../config/passport');
const authController = require('./controllers/authController.client');

router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/login/facebook/callback', authController.facebookLogin);

router.get('/login/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read',
    ],
}));

router.get('/login/google/callback', authController.googleLogin);

module.exports = router;
