const router = require('express').Router();
const multer = require('multer');
const uploadAuthorize = require('./middleware/uploadAuthorize');
const uploadController = require('./controllers/uploadController');

const upload = multer({ dest: 'public/tmp/images' });

router.get('/images', uploadAuthorize.indexAuthorize, uploadController.index);

router.get('/images/upload', uploadAuthorize.uploadAuthorize, uploadController.create);

router.post('/images/upload', uploadAuthorize.storeAuthorize, upload.array('images', 10), uploadController.store);

router.delete('/images/delete', uploadAuthorize.indexAuthorize, uploadController.destroy);

module.exports = router;
