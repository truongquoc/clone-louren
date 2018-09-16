const router = require('express').Router();
const billAuthorize = require('./middleware/billAuthorize');
const billRequest = require('./requests/billRequest');
const billController = require('./controllers/billController.client');

router.get('/don-hang', billController.index);

router.get('/don-hang/chi-tiet/:id', billController.showBill);

module.exports = router;
