const router = require('express').Router();
const uploadAuthorize = require('./middleware/uploadAuthorize');
const uploadController = require('./controllers/uploadController.client');

router.get('/tai-anh', uploadAuthorize.clientUploadAuthorize, uploadController.create);

module.exports = router;
