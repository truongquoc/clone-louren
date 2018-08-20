const router = require('express').Router();
const multer = require('multer');
const imageHandlerAuthorize = require('./middleware/imageHandlerAuthorize');
const imageHandlerController = require('./controllers/imageHandlerController');

const upload = multer({ dest: 'public/tmp/images' });

router.get('/images', imageHandlerAuthorize.indexAuthorize, imageHandlerController.index);

router.get('/images/upload', imageHandlerAuthorize.uploadAuthorize, imageHandlerController.create);

router.post('/images/upload', imageHandlerAuthorize.storeAuthorize, upload.array('images', 10), imageHandlerController.store);

router.delete('/images/delete', imageHandlerAuthorize.indexAuthorize, imageHandlerController.destroy);

module.exports = router;
