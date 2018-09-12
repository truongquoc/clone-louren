const router = require('express').Router();
const blogCategoryMiddleware = require('./middleware/blogCategoryAuthorize');
const blogCategoryController = require('./controllers/blogCategoryController.client');

router.get('/chuyen-muc-:slug', blogCategoryMiddleware.showArticlesAuthorize, blogCategoryController.index);

module.exports = router;
