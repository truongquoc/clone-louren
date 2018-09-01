const router = require('express').Router();
const PropertyCategoryAuthorize = require('./middleware/propertyCategoryAuthorize');
const PropertyCategoryController = require('./controllers/propertyCategoryController.client');

router.get('/loai-hinh-:slug', PropertyCategoryAuthorize.showArticlesAuthorize, PropertyCategoryController.index);

router.get('/loai-hinh-:slug/tim-kiem', PropertyCategoryAuthorize.showArticlesAuthorize, PropertyCategoryController.search);

module.exports = router;
