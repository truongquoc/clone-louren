const router = require('express').Router();
const requestController = require('./controllers/requestController.admin');
const requestAuthorize = require('./middleware/requestAuthorize');

router.get('/', requestAuthorize.indexAuthorize, requestController.index);

router.put('/approve/:id', requestAuthorize.approveAuthorize, requestController.approve);

router.delete('/delete/:id', requestAuthorize.approveAuthorize, requestController.destroy);

module.exports = router;
