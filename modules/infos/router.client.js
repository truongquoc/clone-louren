const express = require('express');
const infoController = require('../infos/controllers/infoController.client');

const router = express.Router();

router.get('/gioi-thieu', infoController.about);

router.get('/phuong-thuc-mua-hang', infoController.purchaseMethod);

router.get('/hinh-thuc-thanh-toan', infoController.payments);

router.get('/chinh-sach-giao-nhan', infoController.deliveryPolicy);

router.get('/quy-dinh-doi-tra', infoController.policyToChange);

router.get('/che-do-bao-hanh', infoController.warranty);

router.get('/chinh-sach-bao-mat', infoController.privacyPolicy);

module.exports = router;
