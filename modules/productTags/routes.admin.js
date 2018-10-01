const router = require('express').Router();

const productTagAuthorize = require('./middleware/productTagAuthorize');
const productTagRequest = require('./requests/productTagRequest');
const productTagController = require('./controllers/productTagController.admin');

router.get('/', productTagAuthorize.indexAuthorize, productTagController.index);

router.post('/create', productTagAuthorize.indexAuthorize, productTagRequest.createTagRequest, productTagController.store);

router.put('/edit/:id', productTagAuthorize.editAuthorize, productTagRequest.editTagRequest, productTagController.update);

router.delete('/delete/:id', productTagAuthorize.editAuthorize, productTagController.destroy);

module.exports = router;
