const router = require('express').Router();
const PropertyCategoryAuthorize = require('./middleware/propertyCategoryAuthorize');
const PropertyCategoryController = require('./controllers/propertyCategoryController.client');

router.get('/:slug', PropertyCategoryAuthorize.showArticlesAuthorize, PropertyCategoryController.index);

module.exports = router;