const router = require('express').Router();
const multer = require('multer');
const authAuthorize = require('../users/middleware/authAuthorize');
const propertyArticleAuthorize = require('./middleware/propertyArticleAuthorize');
const propertyArticleRequest = require('./requests/propertyArticleRequest');
const PropertyCategoryRepositoryClass = require('../propertyCategories/repositories/PropertyCategoryRepository');
const PropertyStatusRepositoryClass = require('../propertyStatuses/repositories/PropertyStatusRepository');
const BlogCategoryRepositoryClass = require('../blogCategories/repositories/BlogCategoryRepository');
const PropertyArticleRepositoryClass = require('./repositories/PropertyArticleRepository');
const propertyArticleController = require('./controllers/propertyArticleController.client');
const adminPropertyArticleController = require('./controllers/propertyArticleController.admin');

const upload = multer({ dest: 'public/tmp/images' });
const PropertyStatusRepository = new PropertyStatusRepositoryClass();
const PropertyCategoryRepository = new PropertyCategoryRepositoryClass();
const BlogCategoryRepository = new BlogCategoryRepositoryClass();
const PropertyArticleRepository = new PropertyArticleRepositoryClass();

router.use(async (req, res, next) => {
    res.locals.propertyStatuses = await PropertyStatusRepository.baseGet();
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

router.get('/:slug', propertyArticleAuthorize.showArticleAuthorize, propertyArticleController.show);

router.use([
    '/nguoi-dung/bai-viet-bat-dong-san/tao-moi',
    '/nguoi-dung/bai-viet-bat-dong-san/:slug',
    '/nguoi-dung/bai-viet-bat-dong-san',
], authAuthorize.clientRedirectIfNotAuthenticated);

router.get('/nguoi-dung/bai-viet-bat-dong-san', propertyArticleController.showMyArticles);

router.get('/nguoi-dung/bai-viet-bat-dong-san/tao-moi', propertyArticleAuthorize.clientShowMyArticlesAuthorize, propertyArticleController.create);

router.post('/nguoi-dung/bai-viet-bat-dong-san/tao-moi', propertyArticleAuthorize.clientShowMyArticlesAuthorize, upload.single('image'), propertyArticleRequest.createArticleRequest, propertyArticleController.store);

router.get('/nguoi-dung/bai-viet-bat-dong-san/:slug', propertyArticleAuthorize.clientEditAuthorize, propertyArticleController.edit);

router.post('/nguoi-dung/bai-viet-bat-dong-san/:id', propertyArticleAuthorize.clientEditAuthorize, upload.single('image'), propertyArticleRequest.editArticleRequest, propertyArticleController.update);

router.delete('/nguoi-dung/bai-viet-bat-dong-san/:id', propertyArticleAuthorize.clientDestroyAuthorize, adminPropertyArticleController.destroy);

router.get('/nguoi-dung/bai-viet-bat-dong-san/:slug/chon-anh', propertyArticleAuthorize.clientEditAuthorize, propertyArticleController.listImages);

router.put('/nguoi-dung/bai-viet-bat-dong-san/:id/chon-anh', propertyArticleAuthorize.clientEditAuthorize, propertyArticleRequest.storeImagesRequest, adminPropertyArticleController.storeImages);

router.get('/nguoi-dung/bai-viet-bat-dong-san/:slug/ban-do', propertyArticleAuthorize.clientEditAuthorize, propertyArticleController.showMap);

module.exports = router;
