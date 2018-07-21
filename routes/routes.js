const router = require('express').Router();

const BlogCategoryRoutes = require('../components/blogCategories/routes-admin');
const HandleExceptionHelper = require('../helpers/handleException.helper');

router.get('/test', (req, res) => {
    return res.render('admin/users/login');
});

router.use('/admin/blog/categories', BlogCategoryRoutes);

router.use(HandleExceptionHelper.handleException);

module.exports = router;
