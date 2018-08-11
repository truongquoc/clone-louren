const router = require('express').Router();

const blogTagAuthorize = require('./middleware/blogTagAuthorize');
const blogTagRequest = require('./requests/blogTagRequest');
const blogTagController = require('./controllers/blogTagController.admin');

router.get('/', blogTagAuthorize.indexAuthorize, blogTagController.index);

router.post('/create', blogTagAuthorize.indexAuthorize, blogTagRequest.createTagRequest, blogTagController.store);

router.put('/edit/:id', blogTagAuthorize.editAuthorize, blogTagRequest.editTagRequest, blogTagController.update);

router.delete('/delete/:id', blogTagAuthorize.editAuthorize, blogTagController.destroy);

module.exports = router;
