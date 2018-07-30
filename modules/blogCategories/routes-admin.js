const router = require('express').Router();

const blogCategoryAuthorize = require('./middleware/blogCategoryAuthorize');
const blogCategoryRequest = require('./requests/blogCategoryRequest');
const blogCategoryController = require('./controllers/blogCategoryController.admin');

router.get('/', blogCategoryAuthorize.indexAuthorize, blogCategoryController.index);

router.post('/create', blogCategoryAuthorize.indexAuthorize, blogCategoryRequest.createCategoryRequest, blogCategoryController.store);

router.put('/edit/:id', blogCategoryAuthorize.editAuthorize, blogCategoryRequest.editCategoryRequest, blogCategoryController.update);

router.delete('/delete/:id', blogCategoryAuthorize.editAuthorize, blogCategoryController.destroy);

module.exports = router;
