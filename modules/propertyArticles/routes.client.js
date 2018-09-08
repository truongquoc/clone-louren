const router = require('express').Router();
const multer = require('multer');
const authAuthorize = require('../users/middleware/authAuthorize');
const propertyArticleAuthorize = require('./middleware/propertyArticleAuthorize');
const propertyArticleRequest = require('./requests/propertyArticleRequest');
const propertyArticleController = require('./controllers/propertyArticleController.client');
const adminPropertyArticleController = require('./controllers/propertyArticleController.admin');

const upload = multer({ dest: 'public/tmp/images' });

router.get('/', propertyArticleController.index);

router.get('/:slug', propertyArticleAuthorize.showArticleAuthorize, propertyArticleController.show);

router.use([
    '/nguoi-dung/bai-viet-bat-dong-san/tao-moi',
    '/nguoi-dung/bai-viet-bat-dong-san/:slug',
    '/nguoi-dung/bai-viet-bat-dong-san',
], authAuthorize.clientRedirectIfNotAuthenticated);

router.get('/nguoi-dung/bai-viet-bat-dong-san', propertyArticleAuthorize.clientShowMyArticlesAuthorize, propertyArticleController.showMyArticles);

router.get('/nguoi-dung/bai-viet-bat-dong-san/tao-moi', propertyArticleAuthorize.clientShowMyArticlesAuthorize, propertyArticleController.create);

router.post('/nguoi-dung/bai-viet-bat-dong-san/tao-moi', propertyArticleAuthorize.clientShowMyArticlesAuthorize, upload.single('image'), propertyArticleRequest.createArticleRequest, propertyArticleController.store);

router.get('/nguoi-dung/bai-viet-bat-dong-san/:slug', propertyArticleAuthorize.clientEditAuthorize, propertyArticleController.edit);

router.post('/nguoi-dung/bai-viet-bat-dong-san/:id', propertyArticleAuthorize.clientEditAuthorize, upload.single('image'), propertyArticleRequest.editArticleRequest, propertyArticleController.update);

router.delete('/nguoi-dung/bai-viet-bat-dong-san/:id', propertyArticleAuthorize.clientEditAuthorize, adminPropertyArticleController.destroy);

router.get('/nguoi-dung/bai-viet-bat-dong-san/:slug/chon-anh', propertyArticleAuthorize.clientEditAuthorize, propertyArticleController.listImages);

router.put('/nguoi-dung/bai-viet-bat-dong-san/:id/chon-anh', propertyArticleAuthorize.clientEditAuthorize, propertyArticleRequest.storeImagesRequest, adminPropertyArticleController.storeImages);

router.get('/nguoi-dung/bai-viet-bat-dong-san/:slug/ban-do', propertyArticleAuthorize.clientEditAuthorize, propertyArticleController.showMap);

module.exports = router;
