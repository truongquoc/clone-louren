const router = require('express').Router();

const AuthAuthorize = require('./middleware/authAuthorize');
const UserAuthorize = require('./middleware/userAuthorize');
const AuthRequest = require('./requests/authRequest');
const UserRequest = require('./requests/userRequest');
const AuthController = require('./controllers/authController.admin');
const UserController = require('./controllers/userController.admin');

router.use('/login', AuthAuthorize.adminRedirectIfAuthenticated);

router.get('/login', AuthController.showLoginForm);

router.post('/login', AuthRequest.loginRequest, AuthController.login);

router.use(AuthAuthorize.adminRedirectIfNotAuthenticated);

router.get('/', AuthController.index);

router.get('/register', UserAuthorize.registerAuthorize, UserController.showRegisterForm);

router.post('/register', UserAuthorize.registerAuthorize, UserRequest.registerRequest, UserController.register);

module.exports = router;