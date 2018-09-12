const router = require('express').Router();

const propertyStatusAuthorize = require('./middleware/propertyStatusAuthorize');
const propertyStatusRequest = require('./requests/propertyStatusRequest');
const propertyStatusController = require('./controllers/propertyStatusController.admin');

router.get('/', propertyStatusAuthorize.indexAuthorize, propertyStatusController.index);

router.post('/create', propertyStatusAuthorize.indexAuthorize, propertyStatusRequest.createStatusRequest, propertyStatusController.store);

router.put('/edit/:id', propertyStatusAuthorize.editAuthorize, propertyStatusRequest.editStatusRequest, propertyStatusController.update);

router.delete('/delete/:id', propertyStatusAuthorize.editAuthorize, propertyStatusController.destroy);

module.exports = router;
