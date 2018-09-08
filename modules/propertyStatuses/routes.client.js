const router = require('express').Router();

const propertyStatusAuthorize = require('./middleware/propertyStatusAuthorize');
const propertyStatusController = require('./controllers/propertyStatusController.client');

router.get('/tt-:slug', propertyStatusAuthorize.showArticlesAuthorize, propertyStatusController.list);

router.get('/tt-:slug/tim-kiem', propertyStatusAuthorize.showArticlesAuthorize, propertyStatusController.search);

module.exports = router;
