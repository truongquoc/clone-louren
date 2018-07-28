const router = require('express').Router();

const BlogArticleAuthorize = require('./middleware/blogArticleAuthorize');
const BlogArticleController = require('./controllers/blogArticleController.admin');

router.get('/', BlogArticleAuthorize.indexAuthorize, BlogArticleController.index);

router.get('/me', BlogArticleAuthorize.showMyArticlesAuthorize, BlogArticleController.showMyArticles);

router.put('/approve/:id', BlogArticleAuthorize.approveAuthorize, BlogArticleController.approve);

router.delete('/delete/:id', BlogArticleAuthorize.deleteAuthorize, BlogArticleController.destroy);

module.exports = router;