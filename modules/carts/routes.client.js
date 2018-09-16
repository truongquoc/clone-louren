const router = require('express').Router();
const { getPropertyTypes } = require('../../infrastructure/controllers/productController.client');
const cartController = require('./controllers/cartController.client');

router.get('/', getPropertyTypes, cartController.index);

module.exports = router;
