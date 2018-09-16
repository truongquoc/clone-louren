const router = require('express').Router();
const billAuthorize = require('./middleware/billAuthorize');
const billController = require('./controllers/billController.admin');

router.get('/', billAuthorize.indexAuthorize, billController.index);

router.get('/:code', billAuthorize.showAuthorize, billController.show);

router.put('/approve/:id', billAuthorize.approveAuthorize, billController.approve);

router.delete('/delete/:id', billAuthorize.approveAuthorize, billController.destroy);

router.put('/revert/:id', billAuthorize.revertAuthorize, billController.revert);

module.exports = router;
