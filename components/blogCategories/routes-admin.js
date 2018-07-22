const router = require('express').Router();

const BlogCategoryAuthorize = require('./middleware/blogCategoryAuthorize');
const BlogCategoryRequest = require('./requests/blogCategoryRequest');
const BlogCategoryController = require('./controllers/blogCategoryController.admin');

router.get('/', BlogCategoryController.index);

router.post('/create', BlogCategoryRequest.createCategoryRequest, BlogCategoryController.store);

router.put('/edit/:id', BlogCategoryAuthorize.editAuthorize, BlogCategoryRequest.editCategoryRequest, BlogCategoryController.update);

router.delete('/delete/:id', BlogCategoryAuthorize.editAuthorize, BlogCategoryController.destroy);

module.exports = router;
