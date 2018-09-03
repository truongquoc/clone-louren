const router = require('express').Router();
const requestRequest = require('./requests/requestRequest');
const requestController = require('./controllers/requestController.client');

router.get('/lien-he', requestController.create);

router.post('/lien-he', requestRequest.createRequestRequest, requestController.store);

module.exports = router;
