const router = require('express').Router();
const multer = require('multer');
const slideAuthorize = require('./middleware/slideAuthorize');
const slideRequest = require('./requests/slideRequest');
const slideController = require('./controllers/slideController.admin');

const upload = multer({ dest: 'public/tmp/images' });

router.get('/', slideAuthorize.indexAuthorize, slideController.index);

router.get('/create', slideAuthorize.indexAuthorize, slideController.create);

router.post('/create', slideAuthorize.indexAuthorize, upload.single('image'), slideRequest.createSlideRequest, slideController.store);

router.get('/edit/:id', slideAuthorize.editAuthorize, slideController.edit);

router.post('/edit/:id', slideAuthorize.editAuthorize, upload.single('image'), slideRequest.editSlideRequest, slideController.update);

router.put('/orders/change', slideAuthorize.changeOrderAuthorize, slideController.changeOrder);

router.delete('/delete/:id', slideAuthorize.editAuthorize, slideController.destroy);

module.exports = router;
