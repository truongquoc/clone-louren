const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const dateHelper = require('../../helpers/dateHelper');
const userAuthorize = require('./middleware/userAuthorize');
const userRequest = require('./requests/userRequest');
const UserController = require('./controllers/userController.admin');

const storage = multer.diskStorage({
    destination: 'public/tmp/images',
    filename: (req, file, callback) => {
        callback(null, dateHelper.getSlugCurrentTime() + path.extname(file.originalname));
    },
});
const upload = multer({ dest: 'public/tmp/images' });

router.get('/', userAuthorize.indexAuthorize, UserController.index);

router.get('/:slug', userAuthorize.showProfileAuthorize, UserController.showProfile);

router.put('/:id', userAuthorize.showProfileAuthorize, userRequest.editProfileRequest, UserController.updateProfile);

router.post('/:id/avatar/original', userAuthorize.uploadAvatarAuthorize, multer({ storage }).single('avatar'), userRequest.uploadAvatar, UserController.uploadOriginalAvatar);

router.post('/:id/avatar', userAuthorize.uploadAvatarAuthorize, upload.single('avatar'), userRequest.uploadAvatar, UserController.uploadAvatar);

router.get('/edit/:slug', userAuthorize.editAuthorize, UserController.edit);

router.put('/edit/:id', userAuthorize.editAuthorize, userRequest.editRequest, UserController.update);

router.delete('/delete/:id', userAuthorize.destroyAuthorize, UserController.destroy);

module.exports = router;
