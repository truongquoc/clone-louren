const router = require('express').Router();
const userAuthorize = require('./middleware/userAuthorize');
const userRequest = require('./requests/userRequest');
const UserController = require('./controllers/userController.admin');

router.get('/', userAuthorize.indexAuthorize, UserController.index);

router.get('/:slug', userAuthorize.showProfileAuthorize, UserController.showProfile);

router.put('/:id', userAuthorize.showProfileAuthorize, userRequest.editProfileRequest, UserController.updateProfile);

router.get('/edit/:slug', userAuthorize.editAuthorize, UserController.edit);

router.put('/edit/:id', userAuthorize.editAuthorize, userRequest.editRequest, UserController.update);

router.delete('/delete/:id', userAuthorize.destroyAuthorize, UserController.destroy);

module.exports = router;
