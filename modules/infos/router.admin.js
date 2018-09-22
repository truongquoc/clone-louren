const express = require('express');
const infoAuthorize = require('./middleware/infoAuthorize');
const infoRequest = require('./requests/infoRequest');
const infoController = require('./controllers/infoController.admin');

const router = express.Router();

router.route('/')
        .get(infoAuthorize.indexAuthorize, infoController.manage)
        .post(infoAuthorize.indexAuthorize, infoRequest.create, infoController.store);

module.exports = router;
