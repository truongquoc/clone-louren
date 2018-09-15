const router = require('express').Router();
const passport = require('../../config/passport');
const authAuthorize = require('./middleware/authAuthorize');
const authRequest = require('./requests/authRequest');
const authController = require('./controllers/authController.client');
const adminAuthController = require('./controllers/authController.admin');

router.use([
    '/dang-nhap',
    '/dang-ky',
    '/dang-ky/:id/thanh-cong',
    '/login/facebook',
    '/login/facebook/callback',
    '/login/google',
    '/login/google/callback',
    '/quen-mat-khau',
    '/quen-mat-khau/khoi-phuc/:token',
], authAuthorize.clientRedirectIfAuthenticated);

router.get('/dang-nhap', authController.showLoginForm);

router.post('/dang-nhap', authRequest.loginRequest, authController.login);

router.get('/dang-ky', authController.showRegisterForm);

router.post('/dang-ky', authRequest.clientRegisterRequest, authController.register);

router.post('/dang-ky/:id/thanh-cong', authAuthorize.successRegisterAuthorize, authController.showSuccessRegisterPage);

router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/login/facebook/callback', authController.facebookLogin);

router.get('/login/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read',
    ],
}));

router.get('/login/google/callback', authController.googleLogin);

router.get('/quen-mat-khau', authController.showForgotPasswordForm);

router.post('/quen-mat-khau', authRequest.clientForgotPasswordRequest, authController.sendMessage);

router.get('/quen-mat-khau/khoi-phuc/:token', authAuthorize.clientResetPasswordAuthorize, authController.showResetPasswordForm);

router.put('/quen-mat-khau/khoi-phuc/:token', authAuthorize.clientResetPasswordAuthorize, authRequest.resetPasswordRequest, authController.resetPassword);

router.get('/nguoi-dung/dang-xuat', authAuthorize.clientRedirectIfNotAuthenticated, adminAuthController.logout);

module.exports = router;
