const router = require('express').Router();
const productTagMiddleware = require('./middleware/productTagAuthorize');
const propertyTypes = require('../../infrastructure/controllers/productController.client');
const productTagController = require('./controllers/productTagController.client');

router.use(propertyTypes.getPropertyTypes);

router.get('/tag-:slug', productTagMiddleware.showArticlesAuthorize, productTagController.index);

module.exports = router;
