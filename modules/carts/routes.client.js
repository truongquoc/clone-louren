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

router.get('/xac-nhan', cartAuthorize.showUserInformationAuthorize, cartAuthorize.verifyProductQuantity, getPropertyTypes, cartController.showUserInformationForm);

router.post('/xac-nhan', cartAuthorize.showUserInformationAuthorize, cartAuthorize.verifyProductQuantity, cartRequest.buyProductRequest, cartController.buyProduct);

module.exports = router;
