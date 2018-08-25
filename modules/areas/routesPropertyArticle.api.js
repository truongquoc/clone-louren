const router = require('express').Router();
const areaAuthorize = require('./middleware/areaAuthorize.api');
const areaRequest = require('./requests/areaRequest.api');
const areaController = require('./controllers/areaController.api');

router.post('/:id/areas', areaAuthorize.storeAuthorize, areaRequest.storeRequest, areaController.store);

router.patch('/:id/areas', areaAuthorize.updateAuthorize, areaRequest.updateRequest, areaController.update);

router.delete('/:id/areas', areaAuthorize.destroyAuthorize, areaRequest.destroyRequest, areaController.destroy);

module.exports = router;
