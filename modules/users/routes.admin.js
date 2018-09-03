const router = require('express').Router();
const multer = require('multer');
const userAuthorize = require('./middleware/userAuthorize');
const userRequest = require('./requests/userRequest');
const UserController = require('./controllers/userController.admin');

const upload = multer({ dest: 'public/tmp/images' });

router.get('/', userAuthorize.indexAuthorize, UserController.index);

router.get('/:slug', userAuthorize.showProfileAuthorize, UserController.showProfile);

router.put('/:id', userAuthorize.showProfileAuthorize, userRequest.editProfileRequest, UserController.updateProfile);

router.post('/:id/avatar/original', userAuthorize.uploadAvatarAuthorize, upload.single('avatar'), UserController.uploadOriginalAvatar);

router.post('/:id/avatar', userAuthorize.uploadAvatarAuthorize, upload.single('avatar'), UserController.uploadAvatar);

router.get('/edit/:slug', userAuthorize.editAuthorize, UserController.edit);

router.put('/edit/:id', userAuthorize.editAuthorize, userRequest.editRequest, UserController.update);

router.delete('/delete/:id', userAuthorize.destroyAuthorize, UserController.destroy);

module.exports = router;
