const router = require('express').Router();
const PropertyCategoryAuthorize = require('./middleware/propertyCategoryAuthorize');
const PropertyCategoryController = require('./controllers/propertyCategoryController.client');

router.get('/tt-:typeSlug/:slug', PropertyCategoryAuthorize.showArticlesAuthorize, PropertyCategoryController.index);

router.get('/tt-:typeSlug/:slug/tim-kiem', PropertyCategoryAuthorize.showArticlesAuthorize, PropertyCategoryController.search);

module.exports = router;
