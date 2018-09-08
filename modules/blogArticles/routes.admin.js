const router = require('express').Router();
const multer = require('multer');
const blogArticleAuthorize = require('./middleware/blogArticleAuthorize');
const blogArticleRequest = require('./requests/blogArticleRequest');
const blogArticleController = require('./controllers/blogArticleController.admin');

const upload = multer({ dest: 'public/tmp/images' });

router.get('/', blogArticleAuthorize.indexAuthorize, blogArticleController.index);

router.get('/me', blogArticleAuthorize.showMyArticlesAuthorize, blogArticleController.showMyArticles);

router.get('/create', blogArticleAuthorize.createArticleAuthorize, blogArticleController.create);

router.post('/create', blogArticleAuthorize.createArticleAuthorize, upload.single('image'), blogArticleRequest.createArticleRequest, blogArticleController.store);

router.get('/edit/:slug', blogArticleAuthorize.editAuthorize, blogArticleController.edit);

router.post('/edit/:id', blogArticleAuthorize.editAuthorize, upload.single('image'), blogArticleRequest.editArticleRequest, blogArticleController.update);

router.put('/approve/:id', blogArticleAuthorize.approveAuthorize, blogArticleController.approve);

router.delete('/delete/:id', blogArticleAuthorize.editAuthorize, blogArticleController.destroy);

module.exports = router;
