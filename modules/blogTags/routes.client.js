const router = require('express').Router();
const blogCategoryMiddleware = require('./middleware/blogTagAuthorize');
const blogCategoryController = require('./controllers/blogTagController.client');

router.get('/the-:slug', blogCategoryMiddleware.showArticlesAuthorize, blogCategoryController.index);

module.exports = router;
