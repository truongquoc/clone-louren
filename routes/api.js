const router = require('express').Router();
const propertyArticleAddressRouter = require('../modules/addresses/routesPropertyArticle.api');
const propertyArticleAreaRouter = require('../modules/areas/routesPropertyArticle.api');

router.use('/v1/property/articles', propertyArticleAddressRouter);

router.use('/v1/property/articles', propertyArticleAreaRouter);

module.exports = router;
