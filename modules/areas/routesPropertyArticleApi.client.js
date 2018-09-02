const router = require('express').Router();
const hashidsAuthorize = require('../../infrastructure/middleware/hashidsAuthorize');
const areaAuthorize = require('./middleware/areaAuthorize.api');
const areaController = require('./controllers/areaController.api');

router.param(['id'], hashidsAuthorize.parseParamsHashids);

router.get('/:id/areas', areaAuthorize.indexAuthorize, areaController.index);

module.exports = router;
