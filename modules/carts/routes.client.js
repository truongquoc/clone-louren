const router = require('express').Router();
const { getPropertyTypes } = require('../../infrastructure/controllers/productController.client');
const authAuthorize = require('../users/middleware/authAuthorize');
const cartAuthorize = require('./middleware/cartAuthorize');
const cartController = require('./controllers/cartController.client');

router.get('/', getPropertyTypes, cartController.index);

router.use(authAuthorize.clientRedirectIfNotAuthenticated);

router.get('/:id/xac-nhan', cartAuthorize.confirmCartAuthorize, getPropertyTypes, cartController.sendConfirmEmail);

// router.get('/xac-nhan', getPropertyTypes, cartAuthorize.cartController.sendEmail);

module.exports = router;
