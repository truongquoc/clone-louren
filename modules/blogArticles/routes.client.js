const router = require('express').Router();
const blogArticleRight = require('../../infrastructure/controllers/blogArticleController.client');
const blogArticleAuthorize = require('./middleware/blogArticleAuthorize');
const blogArticleController = require('./controllers/blogArticleController.client');
const propertyTypes = require('../../infrastructure/controllers/productController.client');

router.use(propertyTypes.getPropertyTypes);
router.get('/', blogArticleRight.blogArticleRight, blogArticleController.index);

router.get('/:slug', blogArticleRight.blogArticleRight, blogArticleAuthorize.showAuthorize, blogArticleController.show);

module.exports = router;
