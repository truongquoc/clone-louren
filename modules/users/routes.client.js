const router = require('express').Router();
const { getPropertyTypes } = require('../../infrastructure/controllers/productController.client');
const authAuthorize = require('./middleware/authAuthorize');
const userRequest = require('./requests/userRequest');
const userController = require('./controllers/userController.client');

router.use(authAuthorize.clientRedirectIfNotAuthenticated);

router.use(getPropertyTypes);

router.get('/', userController.index);

router.get('/thong-tin', userController.showProfile);

router.put('/thong-tin', userRequest.clientEditProfileRequest, userController.updateProfile);

module.exports = router;
