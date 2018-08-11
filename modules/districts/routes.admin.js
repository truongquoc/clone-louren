const router = require('express').Router();

const districtAuthorize = require('./middleware/districtAuthorize');
const districtRequest = require('./requests/districtRequest');
const districtController = require('./controllers/districtController.admin');

router.get('/', districtAuthorize.indexAuthorize, districtController.index);

router.post('/create', districtAuthorize.indexAuthorize, districtRequest.createDistrictRequest, districtController.store);

router.put('/edit/:id', districtAuthorize.editAuthorize, districtRequest.editDistrictRequest, districtController.update);

router.delete('/delete/:id', districtAuthorize.editAuthorize, districtController.destroy);

module.exports = router;
