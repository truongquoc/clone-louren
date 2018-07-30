const router = require('express').Router();
const blogArticleAuthorize = require('./middleware/blogArticleAuthorize');
const blogArticleController = require('./controllers/blogArticleController.admin');

router.get('/', blogArticleAuthorize.indexAuthorize, blogArticleController.index);

router.get('/me', blogArticleAuthorize.showMyArticlesAuthorize, blogArticleController.showMyArticles);

router.put('/approve/:id', blogArticleAuthorize.approveAuthorize, blogArticleController.approve);

router.delete('/delete/:id', blogArticleAuthorize.deleteAuthorize, blogArticleController.destroy);

module.exports = router;
