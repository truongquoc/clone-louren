const router = require('express').Router();

const priceTypeAuthorize = require('./middleware/priceTypeAuthorize');
const priceTypeRequest = require('./requests/priceTypeRequest');
const priceTypeController = require('./controllers/priceTypeController.admin');

router.get('/', priceTypeAuthorize.indexAuthorize, priceTypeController.index);

router.post('/create', priceTypeAuthorize.indexAuthorize, priceTypeRequest.createPriceTypeRequest, priceTypeController.store);

router.put('/edit/:id', priceTypeAuthorize.editAuthorize, priceTypeRequest.editPriceTypeRequest, priceTypeController.update);

router.delete('/delete/:id', priceTypeAuthorize.editAuthorize, priceTypeController.destroy);

module.exports = router;
