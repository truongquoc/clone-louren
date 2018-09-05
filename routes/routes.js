const router = require('express').Router();
const apiRouter = require('./api');
const adminInfrastructureRouter = require('../infrastructure/route.admin');
const adminAuthRoutes = require('../modules/users/authRoutes.admin');
const adminUserRouter = require('../modules/users/routes.admin');
const adminBlogArticleRouter = require('../modules/blogArticles/routes-admin');
const adminBlogCategoryRouter = require('../modules/blogCategories/routes.admin');
const adminBlogTagRouter = require('../modules/blogTags/routes.admin');
const adminCityRouter = require('../modules/cities/routes-admin');
const adminDistrictRouter = require('../modules/districts/routes.admin');
const adminPriceTypeRouter = require('../modules/priceTypes/routes.admin');
const adminPropertyAmenityRouter = require('../modules/propertyAmenities/routes.admin');
const adminPropertyArticleRouter = require('../modules/propertyArticles/routes.admin');
const adminPropertyCategoryRouter = require('../modules/propertyCategories/routes-admin');
const adminPropertyConditionRouter = require('../modules/propertyConditions/routes.admin');
const adminPropertyStatusRouter = require('../modules/propertyStatuses/routes-admin');
const adminPropertyTypeRouter = require('../modules/propertyTypes/routes-admin');
const adminRequestRouter = require('../modules/requests/routes.admin');
const clientAuthRoutes = require('../modules/users/authRoutes.client');
const clientBlogCategoryRouter = require('../modules/blogCategories/routes.client');
const clientBlogTagRouter = require('../modules/blogTags/routes.client');
const clientBlogArticleRouter = require('../modules/blogArticles/routes-client');
const clientPropertyCategoryRouter = require('../modules/propertyCategories/routes.client');
const clientPropertyArticleRouter = require('../modules/propertyArticles/routes.client');
const clientRequestRouter = require('../modules/requests/routes.client');
const handleExceptionHelper = require('../helpers/handleExceptionHelper');

router.use((req, res, next) => {
    res.locals.flashMessages = req.session.flash;
    res.locals.cUser = req.session.cUser;
    delete req.session.flash;
    next();
});

router.use('/v1', apiRouter);
router.use('/admin', adminAuthRoutes);
router.use('/admin', adminInfrastructureRouter);
router.use('/admin/users', adminUserRouter);
router.use('/admin/blog/articles', adminBlogArticleRouter);
router.use('/admin/blog/categories', adminBlogCategoryRouter);
router.use('/admin/blog/tags', adminBlogTagRouter);
router.use('/admin/location/cities', adminCityRouter);
router.use('/admin/location/districts', adminDistrictRouter);
router.use('/admin/price/types', adminPriceTypeRouter);
router.use('/admin/property/amenities', adminPropertyAmenityRouter);
router.use('/admin/property/articles', adminPropertyArticleRouter);
router.use('/admin/property/categories', adminPropertyCategoryRouter);
router.use('/admin/property/conditions', adminPropertyConditionRouter);
router.use('/admin/property/statuses', adminPropertyStatusRouter);
router.use('/admin/property/types', adminPropertyTypeRouter);
router.use('/admin/requests', adminRequestRouter);
router.use('/admin', (req, res) => res.render('errors/admin/404'));

router.use('/', clientAuthRoutes);
router.use('/', clientPropertyArticleRouter);
router.use('/du-an', clientPropertyCategoryRouter);
router.use('/blog', clientBlogCategoryRouter);
router.use('/blog', clientBlogTagRouter);
router.use('/blog', clientBlogArticleRouter);
router.use('/', clientRequestRouter);
router.use('/', (req, res) => res.render('errors/client/404'));

router.use(handleExceptionHelper.handleException);

module.exports = router;
