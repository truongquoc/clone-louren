const router = require('express').Router();
const requestRequest = require('./requests/requestRequest');
const requestController = require('./controllers/requestController.client');

router.get('/', requestController.create);

router.post('/', requestRequest.createRequestRequest, requestController.store);

module.exports = router;
