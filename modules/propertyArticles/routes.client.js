const router = require('express').Router();
const propertyArticleController = require('./controllers/propertyArticleController.client');

router.get('/tim-kiem', propertyArticleController.search);

module.exports = router;
