const router = require('express').Router();
const adminAuthRoutes = require('../modules/users/routes-auth-admin');
const adminBlogArticleRouter = require('../modules/blogArticles/routes-admin');
const adminBlogCategoryRouter = require('../modules/blogCategories/routes-admin');
const adminBlogTagRouter = require('../modules/blogTags/routers-admin');
const handleExceptionHelper = require('../helpers/handleExceptionHelper');

router.use((req, res, next) => {
    res.locals.flashMessages = req.session.flash;
    res.locals.cUser = req.session.cUser;
    delete req.session.flash;
    next();
});

router.use('/admin', adminAuthRoutes);
router.use('/admin/blog/articles', adminBlogArticleRouter);
router.use('/admin/blog/categories', adminBlogCategoryRouter);
router.use('/admin/blog/tags', adminBlogTagRouter);

router.use(handleExceptionHelper.handleException);

module.exports = router;
