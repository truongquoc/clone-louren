const router = require('express').Router();

const propertyConditionAuthorize = require('./middleware/propertyConditionAuthorize');
const propertyConditionRequest = require('./requests/propertyConditionRequest');
const propertyConditionController = require('./controllers/propertyConditionController.admin');

router.get('/', propertyConditionAuthorize.indexAuthorize, propertyConditionController.index);

router.post('/create', propertyConditionAuthorize.indexAuthorize, propertyConditionRequest.createConditionRequest, propertyConditionController.store);

router.put('/edit/:id', propertyConditionAuthorize.editAuthorize, propertyConditionRequest.editConditionRequest, propertyConditionController.update);

router.delete('/delete/:id', propertyConditionAuthorize.editAuthorize, propertyConditionController.destroy);

module.exports = router;
