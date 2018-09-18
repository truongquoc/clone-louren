const router = require('express').Router();
const authAuthorize = require('../users/middleware/authAuthorize');
const billAuthorize = require('./middleware/billAuthorize');
const { getPropertyTypes } = require('../../infrastructure/controllers/productController.client');
const billController = require('./controllers/billController.client');

router.use(authAuthorize.clientRedirectIfNotAuthenticated);

router.get('/don-hang', getPropertyTypes, billController.index);

router.get('/don-hang/:code', billAuthorize.clientShowAuthorize, getPropertyTypes, billController.showBill);

module.exports = router;
