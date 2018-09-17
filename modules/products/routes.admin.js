const router = require('express').Router();
const multer = require('multer');
const productAuthorize = require('./middleware/productAuthorize');
const productRequest = require('./requests/productRequest');
const productController = require('./controllers/productController.admin');

const upload = multer({ dest: 'public/tmp/images' });

router.get('/', productAuthorize.indexAuthorize, productController.index);

router.get('/me', productAuthorize.showMyProductsAuthorize, productController.showMyProducts);

router.get('/create', productAuthorize.createProductAuthorize, productController.create);

router.post('/create', productAuthorize.createProductAuthorize, upload.single('image'), productRequest.createProductRequest, productController.store);

router.get('/edit/:slug', productAuthorize.editAuthorize, productController.edit);

router.post('/edit/:id', productAuthorize.editAuthorize, upload.single('image'), productRequest.editProductRequest, productController.update);

router.put('/approve/:id', productAuthorize.approveAuthorize, productController.approve);

router.delete('/delete/:id', productAuthorize.editAuthorize, productController.destroy);

router.get('/:slug/images', productAuthorize.editAuthorize, productController.listImages);

router.put('/:id/images', productAuthorize.editAuthorize, productRequest.storeImagesRequest, productController.storeImages);

module.exports = router;
