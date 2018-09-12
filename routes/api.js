const router = require('express').Router();
const responseHelper = require('../helpers/responseHelper');
const hashidsAuthorize = require('../infrastructure/middleware/hashidsAuthorize');
const clientPropertyArticleAddressRouter = require('../modules/addresses/routesPropertyArticleApi.client');
const clientPropertyArticleAreaRouter = require('../modules/areas/routesPropertyArticleApi.client');
const adminPropertyArticleAddressRouter = require('../modules/addresses/routesPropertyArticleApi.admin');
const adminPropertyArticleAreaRouter = require('../modules/areas/routesPropertyArticleApi.admin');
const loginRouter = require('../modules/users/authRoutes.api');

router.use('/property/articles', clientPropertyArticleAddressRouter);

router.use('/property/articles', clientPropertyArticleAreaRouter);

router.use(hashidsAuthorize.parseBodyHashids);

router.use('/', loginRouter);

router.use('/property/articles', adminPropertyArticleAddressRouter);

router.use('/property/articles', adminPropertyArticleAreaRouter);

router.use((req, res) => res.json(responseHelper.notFound()));

module.exports = router;
