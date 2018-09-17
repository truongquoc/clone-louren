const router = require('express').Router();
const billAuthorize = require('./middleware/billAuthorize');
const propertyTypes = require('../../infrastructure/controllers/productController.client');
const billController = require('./controllers/billController.client');

router.get('/don-hang', propertyTypes.getPropertyTypes, billController.index);

router.get('/don-hang/:code', billAuthorize.clientShowAuthorize, propertyTypes.getPropertyTypes, billController.showBill);

module.exports = router;
