const router = require('express').Router();
const blogArticleRight = require('../../infrastructure/controllers/blogArticleController.client');
const blogCategoryMiddleware = require('./middleware/blogCategoryAuthorize');
const propertyTypes = require('../../infrastructure/controllers/productController.client');
const blogCategoryController = require('./controllers/blogCategoryController.client');

router.use(propertyTypes.getPropertyTypes);
router.get('/chuyen-muc-:slug', blogArticleRight.blogArticleRight, blogCategoryMiddleware.showArticlesAuthorize, blogCategoryController.index);

module.exports = router;
