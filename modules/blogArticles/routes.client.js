const router = require('express').Router();
const blogArticleRight = require('../../infrastructure/controllers/blogArticleController.client');
const blogArticleAuthorize = require('./middleware/blogArticleAuthorize');
const blogArticleController = require('./controllers/blogArticleController.client');

router.get('/', blogArticleRight.blogArticleRight, blogArticleController.index);

router.get('/:slug', blogArticleRight.blogArticleRight, blogArticleAuthorize.showAuthorize, blogArticleController.show);

module.exports = router;
