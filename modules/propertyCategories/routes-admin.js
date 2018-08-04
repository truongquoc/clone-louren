const router = require('express').Router();

const propertyCategoryAuthorize = require('./middleware/propertyCategoryAuthorize');
const propertyCategoryRequest = require('./requests/propertyCategoryRequest');
const propertyCategoryController = require('./controllers/propertyCategoryController.admin');

router.get('/', propertyCategoryAuthorize.indexAuthorize, propertyCategoryController.index);

router.post('/create', propertyCategoryAuthorize.indexAuthorize, propertyCategoryRequest.createCategoryRequest, propertyCategoryController.store);

router.put('/edit/:id', propertyCategoryAuthorize.editAuthorize, propertyCategoryRequest.editCategoryRequest, propertyCategoryController.update);

router.delete('/delete/:id', propertyCategoryAuthorize.editAuthorize, propertyCategoryController.destroy);

module.exports = router;
