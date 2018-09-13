const router = require('express').Router();

const productTypeAuthorize = require('./middleware/productTypeAuthorize');
const productTypeRequest = require('./requests/productTypeRequest');
const productTypeController = require('./controllers/productTypeController.admin');

router.get('/', productTypeAuthorize.indexAuthorize, productTypeController.index);

router.post('/create', productTypeAuthorize.indexAuthorize, productTypeRequest.createTagRequest, productTypeController.store);

router.put('/edit/:id', productTypeAuthorize.editAuthorize, productTypeRequest.editTagRequest, productTypeController.update);

router.delete('/delete/:id', productTypeAuthorize.editAuthorize, productTypeController.destroy);

router.put('/revert/:id', productTypeAuthorize.revertAuthorize, productTypeController.revert);

module.exports = router;
