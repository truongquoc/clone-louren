const router = require('express').Router();
const { getPropertyTypes } = require('../../infrastructure/controllers/productController.client');
const productTypeAuthorize = require('./middleware/productTypeAuthorize');
const productTypeController = require('./controllers/productTypeController.client');

router.use(['/giam-gia', '/:slug'], getPropertyTypes);

router.get('/giam-gia', productTypeController.getDiscountedProducts);

router.get('/:slug', productTypeAuthorize.showArticlesAuthorize, productTypeController.index);

module.exports = router;
