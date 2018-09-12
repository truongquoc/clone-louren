const router = require('express').Router();

const propertyAmenityAuthorize = require('./middleware/propertyAmenityAuthorize');
const propertyAmenityRequest = require('./requests/propertyAmenityRequest');
const propertyAmenityController = require('./controllers/propertyAmenityController.admin');

router.get('/', propertyAmenityAuthorize.indexAuthorize, propertyAmenityController.index);

router.post('/create', propertyAmenityAuthorize.indexAuthorize, propertyAmenityRequest.createAmenityRequest, propertyAmenityController.store);

router.put('/edit/:id', propertyAmenityAuthorize.editAuthorize, propertyAmenityRequest.editAmenityRequest, propertyAmenityController.update);

router.delete('/delete/:id', propertyAmenityAuthorize.editAuthorize, propertyAmenityController.destroy);

module.exports = router;
