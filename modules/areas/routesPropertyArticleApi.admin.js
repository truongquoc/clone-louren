const router = require('express').Router();
const hashidsAuthorize = require('../../infrastructure/middleware/hashidsAuthorize');
const authAuthorize = require('../users/middleware/authAuthorize');
const areaAuthorize = require('./middleware/areaAuthorize.api');
const areaRequest = require('./requests/areaRequest.api');
const areaController = require('./controllers/areaController.api');

router.param(['id'], hashidsAuthorize.parseParamsHashids);

router.use(authAuthorize.apiAuth);

router.post('/:id/areas', areaAuthorize.storeAuthorize, areaRequest.storeRequest, areaController.store);

router.patch('/:id/areas', areaAuthorize.updateAuthorize, areaRequest.updateRequest, areaController.update);

router.delete('/:id/areas', areaAuthorize.destroyAuthorize, areaRequest.destroyRequest, areaController.destroy);

module.exports = router;
