const router = require('express').Router();
const { getPropertyTypes } = require('../../infrastructure/controllers/productController.client');
const authAuthorize = require('../users/middleware/authAuthorize');
const cartAuthorize = require('./middleware/cartAuthorize');
const cartRequest = require('./requests/cartRequest');
const cartController = require('./controllers/cartController.client');

router.get('/', getPropertyTypes, cartController.index);

router.post('/them-gio-hang', cartController.addToCart);

router.put('/:product/doi-so-luong', cartAuthorize.changeQuantityAuthorize, cartController.changeQuantity);

router.delete('/:product/xoa-san-pham', cartAuthorize.removeProductAuthorize, cartController.removeProduct);

router.get('/xac-nhan', cartAuthorize.verifyProductQuantity, cartAuthorize.showUserInformationAuthorize, getPropertyTypes, cartController.showUserInformationForm);

router.post('/xac-nhan', cartAuthorize.verifyProductQuantity, cartAuthorize.showUserInformationAuthorize, cartRequest.buyProductWithoutLoginRequest, cartController.buyProductWithoutLogin);

router.use(authAuthorize.clientRedirectIfNotAuthenticated);

router.post('/:id/xac-nhan', cartAuthorize.verifyProductQuantity, cartAuthorize.confirmCartAuthorize, cartController.buyProduct);

module.exports = router;
