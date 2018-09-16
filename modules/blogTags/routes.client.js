const router = require('express').Router();
const blogArticleRight = require('../../infrastructure/controllers/blogArticleController.client');

const blogCategoryMiddleware = require('./middleware/blogTagAuthorize');
const blogTagController = require('./controllers/blogTagController.client');

router.get('/the-:slug', blogArticleRight.blogAticleRight, blogCategoryMiddleware.showArticlesAuthorize, blogTagController.index);

module.exports = router;
