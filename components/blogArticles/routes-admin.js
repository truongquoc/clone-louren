const router = require('express').Router();

const BlogArticleController = require('./controllers/blogArticleController.admin');

router.get('/', BlogArticleController.index);

module.exports = router;