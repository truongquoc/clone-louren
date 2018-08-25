const router = require('express').Router();
const multer = require('multer');
const propertyArticleAuthorize = require('./middleware/propertyArticleAuthorize');
const propertyArticleRequest = require('./requests/propertyArticleRequest');
const propertyArticleController = require('./controllers/propertyArticleController.admin');

const upload = multer({ dest: 'public/tmp/images' });

router.get('/', propertyArticleAuthorize.indexAuthorize, propertyArticleController.index);

router.get('/me', propertyArticleAuthorize.showMyArticlesAuthorize, propertyArticleController.showMyArticles);

router.get('/create', propertyArticleAuthorize.createAuthorize, propertyArticleController.create);

router.post('/create', propertyArticleAuthorize.createAuthorize, upload.single('image'), propertyArticleRequest.createArticleRequest, propertyArticleController.store);

router.get('/edit/:slug', propertyArticleAuthorize.editAuthorize, propertyArticleController.edit);

router.post('/edit/:id', propertyArticleAuthorize.editAuthorize, upload.single('image'), propertyArticleRequest.editArticleRequest, propertyArticleController.update);

router.put('/approve/:id', propertyArticleAuthorize.approveAuthorize, propertyArticleController.approve);

router.delete('/delete/:id', propertyArticleAuthorize.destroyAuthorize, propertyArticleController.destroy);

router.get('/:slug/images', propertyArticleAuthorize.editAuthorize, propertyArticleController.listImages);

router.put('/:id/images', propertyArticleAuthorize.editAuthorize, propertyArticleRequest.storeImagesRequest, propertyArticleController.storeImages);

router.get('/:slug/map', propertyArticleController.showMap);

module.exports = router;
