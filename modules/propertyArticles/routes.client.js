const router = require('express').Router();
const authAuthorize = require('../users/middleware/authAuthorize');
const PropertyCategoryRepositoryClass = require('../propertyCategories/repositories/PropertyCategoryRepository');
const BlogCategoryRepositoryClass = require('../blogCategories/repositories/BlogCategoryRepository');
const PropertyArticleRepositoryClass = require('./repositories/PropertyArticleRepository');
const propertyArticleController = require('./controllers/propertyArticleController.client');

const PropertyCategoryRepository = new PropertyCategoryRepositoryClass();
const BlogCategoryRepository = new BlogCategoryRepositoryClass();
const PropertyArticleRepository = new PropertyArticleRepositoryClass();

router.use(async (req, res, next) => {
    res.locals.propertyCategories = await PropertyCategoryRepository.baseGet();
    res.locals.blogCategories = await BlogCategoryRepository.baseGet();
    next();
});

router.get('/', propertyArticleController.index);

router.use(async (req, res, next) => {
    res.locals.propertyCategories = await PropertyArticleRepository.countByCategory(
        res.locals.propertyCategories,
    );
    res.locals.recentPropertyArticles = await PropertyArticleRepository.getRandomArticles();
    next();
});

router.get('/du-an', propertyArticleController.list);

router.get('/du-an/tim-kiem', propertyArticleController.search);

router.get('/du-an-:slug', propertyArticleController.show);

router.use([
    '/nguoi-dung/bai-dang-bat-dong-san/tao-moi',
    '/nguoi-dung/bai-dang-bat-dong-san/chinh-sua/:slug',
    '/nguoi-dung/bai-dang-bat-dong-san',
], authAuthorize.clientRedirectIfNotAuthenticated);

router.get('/nguoi-dung/bai-dang-bat-dong-san/tao-moi', propertyArticleController.create);

router.get('/nguoi-dung/bai-dang-bat-dong-san/chinh-sua/:slug', propertyArticleController.edit);

router.get('/nguoi-dung/bai-dang-bat-dong-san', propertyArticleController.showMyArticles);

module.exports = router;
