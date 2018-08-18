const router = require('express').Router();
const authAuthorize = require('./middleware/authAuthorize');
const userAuthorize = require('./middleware/userAuthorize');
const authRequest = require('./requests/authRequest');
const userRequest = require('./requests/userRequest');
const authController = require('./controllers/authController.admin');
const userController = require('./controllers/userController.admin');

router.use('/login', authAuthorize.adminRedirectIfAuthenticated);

router.get('/login', authController.showLoginForm);

router.post('/login', authRequest.loginRequest, authController.login);

router.use(authAuthorize.adminRedirectIfNotAuthenticated);

router.get('/', authController.index);

router.get('/register', userAuthorize.registerAuthorize, userController.showRegisterForm);

router.post('/register', userAuthorize.registerAuthorize, userRequest.registerRequest, userController.register);

router.get('/logout', authController.logout);

module.exports = router;
