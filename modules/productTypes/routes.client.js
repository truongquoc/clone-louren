const router = require('express').Router();
const { getPropertyTypes } = require('../../infrastructure/controllers/productController.client');
const productTypeAuthorize = require('./middleware/productTypeAuthorize');
const productTypeController = require('./controllers/productTypeController.client');

router.use(['/giam-gia', '/:slug', '/quy-hiem'], getPropertyTypes);

router.get('/giam-gia', productTypeController.listDiscountedProducts);

router.get('/quy-hiem', productTypeController.listRareProducts);

router.get('/:slug', productTypeAuthorize.showArticlesAuthorize, productTypeController.index);

module.exports = router;
