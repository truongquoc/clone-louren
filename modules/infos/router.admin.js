const express = require('express');
const infoController = require('./controllers/infoController.admin');
const infoRequest = require('./requests/infoRequest');

const router = express.Router();

router.route('/')
        .get(infoController.manage)
        .post(infoRequest.create, infoController.store);

module.exports = router;
