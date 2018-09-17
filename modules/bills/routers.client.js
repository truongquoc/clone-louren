const router = require('express').Router();
const billAuthorize = require('./middleware/billAuthorize');
const propertyTypes = require('../../infrastructure/controllers/productController.client');
const billController = require('./controllers/billController.client');

router.get('/don-hang', propertyTypes.getPropertyTypes, billController.index);

router.get('/don-hang/chi-tiet/:code', billAuthorize.showAuthorize, propertyTypes.getPropertyTypes, billController.showBill);

module.exports = router;
