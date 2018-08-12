const router = require('express').Router();
const propertyArticleMiddleware = require('./middleware/propertyArticleAuthorize');
const propertyArticleController = require('./controllers/propertyArticleController.admin');

router.get('/create', propertyArticleMiddleware.create, propertyArticleController.create);

module.exports = router;
