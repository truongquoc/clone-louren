const router = require('express').Router();
const addressAuthorize = require('./middleware/addressAuthorize.api');
const addressRequest = require('./requests/addressRequest.api');
const addressController = require('./controllers/addressController.api');

router.get('/:id/addresses', addressAuthorize.indexAuthorize, addressController.index);

router.post('/:id/addresses', addressAuthorize.storeAuthorize, addressRequest.storeRequest, addressController.store);

router.patch('/:id/addresses', addressAuthorize.updateAuthorize, addressRequest.updateRequest, addressController.update);

router.delete('/:id/addresses', addressAuthorize.destroyAuthorize, addressRequest.destroyRequest, addressController.destroy);

module.exports = router;
