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
    const [
        propertyStatuses,
        propertyCategories,
        blogCategories,
    ] = await Promise.all([
        PropertyStatusRepository.baseGet(),
        PropertyCategoryRepository.baseGet(),
        BlogCategoryRepository.baseGet(),
    ]);
    res.locals.propertyStatuses = propertyStatuses;
    res.locals.propertyCategories = propertyCategories;
    res.locals.blogCategories = blogCategories;
    if (req.originalUrl !== '/') {
        const [propertyCategoriesWithCountArticle, recentPropertyArticles] = await Promise.all([
            PropertyArticleRepository.countByCategory(
                res.locals.propertyCategories,
            ),
            PropertyArticleRepository.getRandomArticles(),
        ]);
        res.locals.propertyCategories = propertyCategoriesWithCountArticle;
        res.locals.recentPropertyArticles = recentPropertyArticles;
    }
    next();
});

router.get('/tt-:slug', propertyStatusAuthorize.showArticlesAuthorize, propertyStatusController.list);

router.get('/tt-:slug/tim-kiem', propertyStatusAuthorize.showArticlesAuthorize, propertyStatusController.search);

module.exports = router;
