const router = require('express').Router();

const BlogCategoryAuthorize = require('./middleware/blogCategoryAuthorize');
const BlogCategoryRequest = require('./requests/blogCategoryRequest');
const BlogCategoryController = require('./controllers/blogCategoryController.admin');

router.get('/', BlogCategoryAuthorize.indexAuthorize, BlogCategoryController.index);

router.post('/create', BlogCategoryAuthorize.indexAuthorize, BlogCategoryRequest.createCategoryRequest, BlogCategoryController.store);

router.put('/edit/:id', BlogCategoryAuthorize.editAuthorize, BlogCategoryRequest.editCategoryRequest, BlogCategoryController.update);

router.delete('/delete/:id', BlogCategoryAuthorize.editAuthorize, BlogCategoryController.destroy);

module.exports = router;
 