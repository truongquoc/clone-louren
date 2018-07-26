const router = require('express').Router();

const BlogTagAuthorize = require ('./middleware/blogTagAuthorize');
const BlogTagRequest = require ('./requests/blogTagRequest');
const BlogTagController = require('./controllers/BlogTagController.admin');

router.get('/', BlogTagAuthorize.indexAuthorize, BlogTagController.index);

router.post('/create', BlogTagAuthorize.indexAuthorize, BlogTagRequest.createTagRequest, BlogTagController.store);

router.put('/edit/:id', BlogTagAuthorize.editAuthorize , BlogTagRequest.editTagRequest, BlogTagController.update);

router.delete('/delete/:id', BlogTagAuthorize.editAuthorize , BlogTagController.destroy);

module.exports = router;
