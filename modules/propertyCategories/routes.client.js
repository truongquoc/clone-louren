const router = require('express').Router();
const PropertyCategoryAuthorize = require('./middleware/propertyCategoryAuthorize');
const PropertyCategoryController = require('./controllers/propertyCategoryController.client');

router.get('/loai-hinh-:slug', PropertyCategoryAuthorize.showArticlesAuthorize, PropertyCategoryController.index);

module.exports = router;
