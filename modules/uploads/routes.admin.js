const router = require('express').Router();
const multer = require('multer');
const uploadAuthorize = require('./middleware/uploadAuthorize');
const uploadRequest = require('./requests/uploadRequest');
const uploadController = require('./controllers/uploadController.admin');

const upload = multer({ dest: 'public/tmp/images' });

// router.get('/storage', uploadAuthorize.indexAuthorize, uploadController.index);

router.get('/', uploadAuthorize.indexAuthorize, uploadController.list);

router.get('/me', uploadAuthorize.uploadAuthorize, uploadController.showMyUploads);

router.get('/upload', uploadAuthorize.uploadAuthorize, uploadController.create);

router.post('/upload', uploadAuthorize.storeAuthorize, upload.array('images', 20), uploadRequest.uploadImageRequest, uploadController.store);

router.delete('/delete', uploadAuthorize.destroyAuthorize, uploadController.destroy);

router.delete('/delete/url', uploadAuthorize.indexAuthorize, uploadController.destroyByUrl);

module.exports = router;
