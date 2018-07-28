const router = require('express').Router();

const BlogArticleAuthorize = require('./middleware/blogArticleAuthorize');
const BlogArticleController = require('./controllers/blogArticleController.admin');

router.get('/', BlogArticleAuthorize.indexAuthorize, BlogArticleController.index);

module.exports = router;