const router = require('express').Router();

const AdminAuthRoutes = require('../components/users/routes-auth-admin');
const AdminBlogArticleRouter = require('../components/blogArticles/routes-admin');
const AdminBlogCategoryRouter = require('../components/blogCategories/routes-admin');
const AdminBlogTagRouter = require('../components/blogTags/routers-admin');
const HandleExceptionHelper = require('../helpers/handleException.helper');

router.get('/test', (req, res) => {
    return res.render('components/users/admin/auth/register');
});

router.use(function (req, res, next) {
    res.locals.flashMessages = req.session.flash;
    res.locals.cUser = req.session.cUser;
    delete req.session.flash;
    next();
});

router.use('/admin', AdminAuthRoutes);
router.use('/admin/blog/articles', AdminBlogArticleRouter);
router.use('/admin/blog/categories', AdminBlogCategoryRouter);
router.use('/admin/blog/tags', AdminBlogTagRouter);

router.use(HandleExceptionHelper.handleException);

module.exports = router;
