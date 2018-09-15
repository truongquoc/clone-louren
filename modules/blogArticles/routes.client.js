const router = require('express').Router();
const blogArticleRight = require('../../infrastructure/controllers/blogArticleController.client');
const blogArticleAuthorize = require('./middleware/blogArticleAuthorize');
const blogArticleController = require('./controllers/blogArticleController.client');

router.get('/', blogArticleRight.blogAticleRight, blogArticleController.index);

router.get('/:slug', blogArticleRight.blogAticleRight, blogArticleAuthorize.showAuthorize, blogArticleController.show);

module.exports = router;
