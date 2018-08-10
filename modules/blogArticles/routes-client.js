const router = require('express').Router();
const blogArticleAuthorize = require('./middleware/blogArticleAuthorize');
const blogArticleController = require('./controllers/blogArticleController.client');

router.get('/', blogArticleAuthorize.indexAuthorize, blogArticleController.index);

router.get('/:slug', blogArticleAuthorize.showAuthorize, blogArticleController.show);

module.exports = router;
