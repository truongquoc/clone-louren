const router = require('express').Router();
const hashidsAuthorize = require('../../infrastructure/middleware/hashidsAuthorize');
const authAuthorize = require('../users/middleware/authAuthorize');
const addressAuthorize = require('./middleware/addressAuthorize.api');
const addressRequest = require('./requests/addressRequest.api');
const addressController = require('./controllers/addressController.api');

router.param(['id'], hashidsAuthorize.parseParamsHashids);

router.use(authAuthorize.apiAuth);

router.post('/:id/addresses', addressAuthorize.storeAuthorize, addressRequest.storeRequest, addressController.store);

router.patch('/:id/addresses', addressAuthorize.updateAuthorize, addressRequest.updateRequest, addressController.update);

router.delete('/:id/addresses', addressAuthorize.destroyAuthorize, addressRequest.destroyRequest, addressController.destroy);

module.exports = router;
