const express = require('express');
const infoController = require('../infos/controllers/infoController.client');

const router = express.Router();

router.get('/gioi-thieu', infoController.about);
router.get('/chinh-sach', infoController.policy);
router.get('/cam-ket', infoController.courage);

module.exports = router;
