const router = require('express').Router();
const PropertyCategoryRepositoryClass = require('../propertyCategories/repositories/PropertyCategoryRepository');
const propertyArticleController = require('./controllers/propertyArticleController.client');

const PropertyCategoryRepository = new PropertyCategoryRepositoryClass();

router.use(async (req, res, next) => {
    res.locals.propertyCategories = await PropertyCategoryRepository.baseGet();
    next();
});

router.get('/', propertyArticleController.index);

router.get('/bai-viet/tim-kiem', propertyArticleController.search);

module.exports = router;
