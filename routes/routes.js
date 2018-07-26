const router = require('express').Router();

const BlogCategoryRouter = require('../components/blogCategories/routes-admin');
const BlogTagRouter = require('../components/blogTags/routers-admin');
const HandleExceptionHelper = require('../helpers/handleException.helper');

router.get('/test', (req, res) => {
    return res.render('components/propertyArticles/client/index');
});

router.use('/admin/blog/categories', BlogCategoryRouter);
router.use('/admin/blog/tags', BlogTagRouter);

router.use(HandleExceptionHelper.handleException);


module.exports = router;
