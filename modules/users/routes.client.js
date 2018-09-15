const router = require('express').Router();
const authAuthorize = require('./middleware/authAuthorize');
const userRequest = require('./requests/userRequest');
const userController = require('./controllers/userController.client');

router.use(authAuthorize.clientRedirectIfNotAuthenticated);

router.get('/', userController.index);

router.get('/thong-tin', userController.showProfile);

router.put('/thong-tin', userRequest.clientEditProfileRequest, userController.updateProfile);

module.exports = router;
