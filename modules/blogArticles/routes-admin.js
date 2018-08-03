const router = require('express').Router();
const multer = require('multer');
const blogArticleAuthorize = require('./middleware/blogArticleAuthorize');
const blogArticleRequest = require('./requests/blogArticleRequest');
const blogArticleController = require('./controllers/blogArticleController.admin');

const upload = multer({ dest: '/tmp' });

router.get('/', blogArticleAuthorize.indexAuthorize, blogArticleController.index);

router.get('/me', blogArticleAuthorize.showMyArticlesAuthorize, blogArticleController.showMyArticles);

router.get('/create', blogArticleAuthorize.createArticleAuthorize, blogArticleController.create);

router.post('/create', blogArticleAuthorize.createArticleAuthorize, upload.single('image'), blogArticleRequest.createArticleRequest, blogArticleController.store);

router.put('/approve/:id', blogArticleAuthorize.approveAuthorize, blogArticleController.approve);

router.delete('/delete/:id', blogArticleAuthorize.deleteAuthorize, blogArticleController.destroy);

module.exports = router;
