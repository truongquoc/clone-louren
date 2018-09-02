const router = require('express').Router();
const authRequest = require('./requests/authRequest');
const authController = require('./controllers/authController.api');

router.post('/login', authRequest.loginRequest, authController.login);

module.exports = router;
