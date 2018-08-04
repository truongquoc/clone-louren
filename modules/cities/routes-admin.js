const router = require('express').Router();

const cityAuthorize = require('./middleware/cityAuthorize');
const cityRequest = require('./requests/cityRequest');
const cityController = require('./controllers/cityController.admin');

router.get('/', cityAuthorize.indexAuthorize, cityController.index);

router.post('/create', cityAuthorize.indexAuthorize, cityRequest.createCityRequest, cityController.store);

router.put('/edit/:id', cityAuthorize.editAuthorize, cityRequest.editCityRequest, cityController.update);

router.delete('/delete/:id', cityAuthorize.editAuthorize, cityController.destroy);

module.exports = router;
