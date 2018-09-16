const router = require('express').Router();
const { getPropertyTypes } = require('../../infrastructure/controllers/productController.client');
const productTypeAuthorize = require('./middleware/productTypeAuthorize');
const productTypeController = require('./controllers/productTypeController.client');

router.get('/:slug', productTypeAuthorize.showArticlesAuthorize, getPropertyTypes, productTypeController.index);

module.exports = router;
