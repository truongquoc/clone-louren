const router = require('express').Router();
const multer = require('multer');
const imageHandlerController = require('./controllers/imageHandlerController');

const upload = multer({ dest: 'public/tmp/images' });

router.post('/images/upload', upload.single('image'), imageHandlerController.store);

module.exports = router;
