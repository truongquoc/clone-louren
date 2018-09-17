const router = require('express').Router();
const { getPropertyTypes } = require('../../infrastructure/controllers/productController.client');
const authAuthorize = require('../users/middleware/authAuthorize');
const cartAuthorize = require('./middleware/cartAuthorize');
const cartRequest = require('./requests/cartRequest');
const cartController = require('./controllers/cartController.client');

router.get('/', getPropertyTypes, cartController.index);

router.get('/xac-nhan', cartAuthorize.showUserInformationRequest, cartController.showUserInformationForm);

router.post('/xac-nhan', cartAuthorize.showUserInformationRequest, cartRequest.buyProductWithoutLoginRequest, cartController.buyProductWithoutLogin);

router.use(authAuthorize.clientRedirectIfNotAuthenticated);

router.post('/:id/xac-nhan', cartAuthorize.confirmCartAuthorize, getPropertyTypes, cartController.buyProduct);

module.exports = router;
