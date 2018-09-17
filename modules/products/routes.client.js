const router = require('express').Router();
const { getPropertyTypes } = require('../../infrastructure/controllers/productController.client');
const productController = require('./controllers/productController.client');

router.use([
    '/',
    '/mat-hang',
    '/tim-kiem',
], getPropertyTypes);

router.get('/', productController.index);

router.get('/mat-hang', productController.list);

router.get('/tim-kiem', productController.search);

module.exports = router;
