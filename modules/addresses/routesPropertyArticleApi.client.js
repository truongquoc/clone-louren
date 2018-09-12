const router = require('express').Router();
const hashidsAuthorize = require('../../infrastructure/middleware/hashidsAuthorize');
const addressAuthorize = require('./middleware/addressAuthorize.api');
const addressController = require('./controllers/addressController.api');

router.param(['id'], hashidsAuthorize.parseParamsHashids);

router.get('/:id/addresses', addressAuthorize.indexAuthorize, addressController.index);

module.exports = router;
