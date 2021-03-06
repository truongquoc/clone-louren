const router = require('express').Router();
const { countCartProduct, getNewestProducts } = require('../infrastructure/controllers/productController.client');
const adminAuthRoutes = require('../modules/users/authRoutes.admin');
const adminUploadRouter = require('../modules/uploads/routes.admin');
const adminUserRouter = require('../modules/users/routes.admin');
const adminProductRouter = require('../modules/products/routes.admin');
const adminProductTypeRouter = require('../modules/productTypes/routes.admin');
const adminProductTagRouter = require('../modules/productTags/routes.admin');
const adminBillRouter = require('../modules/bills/routes.admin');
const adminBlogArticleRouter = require('../modules/blogArticles/routes.admin');
const adminBlogCategoryRouter = require('../modules/blogCategories/routes.admin');
const adminBlogTagRouter = require('../modules/blogTags/routes.admin');
const adminSlideRouter = require('../modules/slides/routes.admin');
const adminInfoRouter = require('../modules/infos/router.admin');
const adminRobotRouter = require('../modules/robots/router.admin');
const adminLinkRouter = require('../modules/links/router.admin');
const clientAuthRoutes = require('../modules/users/authRoutes.client');
const clientProductTagRouter = require('../modules/productTags/routes.client');
const clientProductTypeRouter = require('../modules/productTypes/routes.client');
const clientCartRouter = require('../modules/carts/routes.client');
const clientProductRoutes = require('../modules/products/routes.client');
const clientBlogCategoryRouter = require('../modules/blogCategories/routes.client');
const clientBlogTagRouter = require('../modules/blogTags/routes.client');
const clientBlogArticleRouter = require('../modules/blogArticles/routes.client');
const clientUserRouter = require('../modules/users/routes.client');
const clientBillRouter = require('../modules/bills/routers.client');
const clientInfoRouter = require('../modules/infos/router.client');
const handleExceptionHelper = require('../helpers/handleExceptionHelper');
const redisHelper = require('../helpers/redisHelper');
const languageHelper = require('../helpers/languageHelper');

router.use((req, res, next) => {
    res.locals.flashMessages = req.session.flash;
    res.locals.cUser = req.session.cUser;
    delete req.session.flash;
    next();
});

router.use(languageHelper.getCookie);

router.use('/admin', adminAuthRoutes);
router.use('/admin/images', adminUploadRouter);
router.use('/admin/users', adminUserRouter);
router.use('/admin/products', adminProductRouter);
router.use('/admin/product/tags', adminProductTagRouter);
router.use('/admin/product/types', adminProductTypeRouter);
router.use('/admin/bills', adminBillRouter);
router.use('/admin/blog/articles', adminBlogArticleRouter);
router.use('/admin/blog/categories', adminBlogCategoryRouter);
router.use('/admin/blog/tags', adminBlogTagRouter);
router.use('/admin/slides', adminSlideRouter);
router.use('/admin/infos', adminInfoRouter);
router.use('/admin/robots', adminRobotRouter);
router.use('/admin/links', adminLinkRouter);
router.use('/admin', (req, res) => res.render('errors/admin/404'));

router.use(redisHelper.getRedis);

router.use(countCartProduct, getNewestProducts);
router.use('/', clientAuthRoutes);
router.use('/blog', clientBlogCategoryRouter);
router.use('/blog', clientBlogTagRouter);
router.use('/blog', clientBlogArticleRouter);
router.use('/nguoi-dung', clientBillRouter);
router.use('/nguoi-dung', clientUserRouter);
router.use('/mat-hang', clientProductTagRouter);
router.use('/mat-hang', clientProductTypeRouter);
router.use('/gio-hang', clientCartRouter);
router.use('/', clientProductRoutes);
router.use('/', clientInfoRouter);
router.get('/languages/:language', languageHelper.setCookie);
router.use('/', (req, res) => res.render('errors/client/404'));

router.use(handleExceptionHelper.handleException);

module.exports = router;
