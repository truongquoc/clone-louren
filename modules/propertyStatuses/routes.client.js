const router = require('express').Router();

const propertyStatusAuthorize = require('./middleware/propertyStatusAuthorize');
const propertyStatusController = require('./controllers/propertyStatusController.client');
const PropertyCategoryRepositoryClass = require('../propertyCategories/repositories/PropertyCategoryRepository');
const PropertyStatusRepositoryClass = require('../propertyStatuses/repositories/PropertyStatusRepository');
const BlogCategoryRepositoryClass = require('../blogCategories/repositories/BlogCategoryRepository');
const PropertyArticleRepositoryClass = require('../propertyArticles/repositories/PropertyArticleRepository');

const PropertyStatusRepository = new PropertyStatusRepositoryClass();
const PropertyCategoryRepository = new PropertyCategoryRepositoryClass();
const BlogCategoryRepository = new BlogCategoryRepositoryClass();
const PropertyArticleRepository = new PropertyArticleRepositoryClass();

router.use(async (req, res, next) => {
    res.locals.propertyStatuses = await PropertyStatusRepository.baseGet();
    res.locals.propertyCategories = await PropertyCategoryRepository.baseGet();
    res.locals.blogCategories = await BlogCategoryRepository.baseGet();
    res.locals.propertyCategories = await PropertyArticleRepository.countByCategory(
        res.locals.propertyCategories,
    );
    res.locals.recentPropertyArticles = await PropertyArticleRepository.getRandomArticles();
    next();
});

router.get('/tt-:slug', propertyStatusAuthorize.showArticlesAuthorize, propertyStatusController.list);

router.get('/tt-:slug/tim-kiem', propertyStatusAuthorize.showArticlesAuthorize, propertyStatusController.search);

module.exports = router;
