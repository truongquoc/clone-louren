const router = require('express').Router();

const propertyTypeAuthorize = require('./middleware/propertyTypeAuthorize');
const propertyTypeRequest = require('./requests/propertyTypeRequest');
const propertyTypeController = require('./controllers/propertyTypeController.admin');

router.get('/', propertyTypeAuthorize.indexAuthorize, propertyTypeController.index);

router.post('/create', propertyTypeAuthorize.indexAuthorize, propertyTypeRequest.createTypeRequest, propertyTypeController.store);

router.put('/edit/:id', propertyTypeAuthorize.editAuthorize, propertyTypeRequest.editTypeRequest, propertyTypeController.update);

router.delete('/delete/:id', propertyTypeAuthorize.editAuthorize, propertyTypeController.destroy);

module.exports = router;
