const router = require('express').Router();
const authAuthorize = require('../users/middleware/authAuthorize');
const billAuthorize = require('./middleware/billAuthorize');
const propertyTypes = require('../../infrastructure/controllers/productController.client');
const billController = require('./controllers/billController.client');

router.use(authAuthorize.clientRedirectIfNotAuthenticated);

router.get('/don-hang', propertyTypes.getPropertyTypes, billController.index);

router.get('/don-hang/:code', billAuthorize.clientShowAuthorize, propertyTypes.getPropertyTypes, billController.showBill);

module.exports = router;
