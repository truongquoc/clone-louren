const router = require('express').Router();
const authAuthorize = require('./middleware/authAuthorize');
const userAuthorize = require('./middleware/userAuthorize');
const authRequest = require('./requests/authRequest');
const userRequest = require('./requests/userRequest');
const authController = require('./controllers/authController.admin');
const userController = require('./controllers/userController.admin');

router.use(['/login', '/password/forgot', '/password/reset/:token'], authAuthorize.adminRedirectIfAuthenticated);

router.get('/login', authController.showLoginForm);

router.post('/login', authRequest.loginRequest, authController.login);

router.get('/password/forgot', authController.showForgotPasswordForm);

router.post('/password/forgot', authRequest.forgotPasswordRequest, authController.sendMessage);

router.get('/password/reset/:token', authAuthorize.resetPasswordAuthorize, authController.showResetPasswordForm);

router.put('/password/reset/:token', authAuthorize.resetPasswordAuthorize, authRequest.resetPasswordRequest, authController.resetPassword);

router.use(authAuthorize.adminRedirectIfNotAuthenticated);

router.get('/', userAuthorize.viewAdminAuthorize, authController.index);

router.get('/register', userAuthorize.registerAuthorize, userController.showRegisterForm);

router.post('/register', userAuthorize.registerAuthorize, userRequest.registerRequest, userController.register);

router.get('/password/change', authController.showChangePasswordForm);

router.put('/password/change', authRequest.changePasswordRequest, authController.changePassword);

router.get('/logout', authController.logout);

module.exports = router;
