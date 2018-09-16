const router = require('express').Router();
const adminUploadRouter = require('../modules/uploads/routes.admin');
const adminAuthRoutes = require('../modules/users/authRoutes.admin');
const adminUserRouter = require('../modules/users/routes.admin');
const adminProductRouter = require('../modules/products/routes.admin');
const adminProductTypeRouter = require('../modules/productTypes/routes.admin');
const adminBillRouter = require('../modules/bills/routes.admin');
const adminBlogArticleRouter = require('../modules/blogArticles/routes.admin');
const adminBlogCategoryRouter = require('../modules/blogCategories/routes.admin');
const adminBlogTagRouter = require('../modules/blogTags/routes.admin');
const clientAuthRoutes = require('../modules/users/authRoutes.client');
const clientProductTypeRouter = require('../modules/productTypes/routes.client');
const clientProductRoutes = require('../modules/products/routes.client');
const clientBlogCategoryRouter = require('../modules/blogCategories/routes.client');
const clientBlogTagRouter = require('../modules/blogTags/routes.client');
const clientBlogArticleRouter = require('../modules/blogArticles/routes.client');
const clientUserRouter = require('../modules/users/routes.client');
const handleExceptionHelper = require('../helpers/handleExceptionHelper');

router.use((req, res, next) => {
    res.locals.flashMessages = req.session.flash;
    res.locals.cUser = req.session.cUser;
    delete req.session.flash;
    next();
});

router.use('/admin', adminAuthRoutes);
router.use('/admin/images', adminUploadRouter);
router.use('/admin/users', adminUserRouter);
router.use('/admin/products', adminProductRouter);
router.use('/admin/product/types', adminProductTypeRouter);
router.use('/admin/bills', adminBillRouter);
router.use('/admin/blog/articles', adminBlogArticleRouter);
router.use('/admin/blog/categories', adminBlogCategoryRouter);
router.use('/admin/blog/tags', adminBlogTagRouter);
router.use('/admin', (req, res) => res.render('errors/admin/404'));

router.use('/', clientAuthRoutes);
router.use('/blog', clientBlogCategoryRouter);
router.use('/blog', clientBlogTagRouter);
router.use('/blog', clientBlogArticleRouter);
router.use('/nguoi-dung', clientUserRouter);
router.use('/mat-hang', clientProductTypeRouter);
router.use('/', clientProductRoutes);
router.use('/', (req, res) => res.sendStatus(404));

router.use(handleExceptionHelper.handleException);

module.exports = router;
