const router = require('express').Router();
const hashidsAuthorize = require('../infrastructure/middleware/hashidsAuthorize');
const clientPropertyArticleAddressRouter = require('../modules/addresses/routesPropertyArticleApi.client');
const clientPropertyArticleAreaRouter = require('../modules/areas/routesPropertyArticleApi.client');
const adminPropertyArticleAddressRouter = require('../modules/addresses/routesPropertyArticleApi.admin');
const adminPropertyArticleAreaRouter = require('../modules/areas/routesPropertyArticleApi.admin');
const loginRouter = require('../modules/users/authRoutes.api');

router.use('/v1/property/articles', clientPropertyArticleAddressRouter);

router.use('/v1/property/articles', clientPropertyArticleAreaRouter);

router.use(hashidsAuthorize.parseBodyHashids);

router.use('/v1', loginRouter);

router.use('/v1/property/articles', adminPropertyArticleAddressRouter);

router.use('/v1/property/articles', adminPropertyArticleAreaRouter);

module.exports = router;
