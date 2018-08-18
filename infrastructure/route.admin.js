const router = require('express').Router();
const multer = require('multer');
const imageHandlerController = require('./controllers/imageHandlerController');

const upload = multer({ dest: 'public/tmp/images' });

router.get('/images', imageHandlerController.index);

router.get('/images/upload', imageHandlerController.create);

router.post('/images/upload', upload.array('images', 10), imageHandlerController.store);

router.delete('/images/delete', imageHandlerController.destroy);

module.exports = router;
