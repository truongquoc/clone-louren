const router = require('express').Router();
const blogArticleRight = require('../../infrastructure/controllers/blogArticleController.client');
const blogCategoryMiddleware = require('./middleware/blogTagAuthorize');
const propertyTypes = require('../../infrastructure/controllers/productController.client');
const blogTagController = require('./controllers/blogTagController.client');

router.use(propertyTypes.getPropertyTypes);

router.get('/tag-:slug', blogArticleRight.blogArticleRight, blogCategoryMiddleware.showArticlesAuthorize, blogTagController.index);

module.exports = router;
