const { validationResult } = require('express-validator/check');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');
const imageHelper = require('../../../helpers/imageHelper');
const storageHelper = require('../../../helpers/storage/storageHelper');
const dateHelper = require('../../../helpers/dateHelper');
const AuthRepositoryClass = require('../repositories/AuthRepository');
const UserRepositoryClass = require('../repositories/UserRepository');
const RoleRepositoryClass = require('../repositories/RoleRepository');
const UploadRepositoryClass = require('../../uploads/repositories/UploadRepository');

const AuthRepository = new AuthRepositoryClass();
const UserRepository = new UserRepositoryClass();
const RoleRepository = new RoleRepositoryClass();
const UploadRepository = new UploadRepositoryClass();

const showRegisterForm = (req, res) => res.render('modules/users/admin/auth/register');

const register = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('oldValue', data);
        req.flash('errors', errors.mapped());
        return res.redirectBack();
    }
    try {
        await UserRepository.create(data);
        req.flash('success', 'Tạo tài khoản thành công');

        return res.redirect('/admin/register');
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const users = await UserRepository.list({ query, pageUrl: req.baseUrl });
        users.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/users/admin/list', {
            users, query,
        });
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

const showProfile = async (req, res, next) => {
    try {
        const user = await UserRepository.getUserWithRoles({
            name: 'slug',
            value: req.params.slug,
        });
        return res.render('modules/users/admin/profile', {
            user,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const updateProfile = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('oldValue', data);
        req.flash('errors', errors.mapped());
        return res.redirectBack();
    }
    try {
        await UserRepository.updateProfile(data, req.session.cUser._id, !!req.session.cUser.email);
        const user = await UserRepository.getUserWithRoles({
            name: 'id',
            value: req.session.cUser._id,
        });
        req.session.cUser = AuthRepository.getCurrentUserData(user);
        req.flash('success', 'Chỉnh sửa thành công');

        return res.redirectBack();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const uploadOriginalAvatar = async (req, res) => {
    const errors = validationResult(req);
    let image = req.file;
    if (!errors.isEmpty()) {
        imageHelper.deleteImage(image, false);
        return res.json(responseHelper.error(errors.mapped(), 400));
    }
    try {
        image = imageHelper.getOriginalImage(image, false);
        const url = await storageHelper.storage('local').upload(`avatars/original/${dateHelper.getSlugCurrentTime()}.jpg`, image, 'public-read');
        await UploadRepository.create([url], req.session.cUser, true);

        return res.json(responseHelper.success(`/${image.path}`));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const uploadAvatar = async (req, res) => {
    const errors = validationResult(req);
    let image = req.file;
    if (!errors.isEmpty()) {
        imageHelper.deleteImage(image, false);
        return res.json(responseHelper.error(errors.mapped(), 400));
    }
    try {
        image = await imageHelper.optimizeImage(image, {
            width: 160,
            height: 160,
            quality: 80,
        });
        const url = await storageHelper.storage('local').upload(`avatars/${dateHelper.getSlugCurrentTime()}.jpg`, image, 'public-read');
        await Promise.all([
            UploadRepository.create([url], req.session.cUser._id),
            UserRepository.updateAvatar(url, req.session.cUser._id),
        ]);
        req.session.cUser.avatar = url;

        return res.json(responseHelper.success(url));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const edit = async (req, res, next) => {
    try {
        const [user, roles] = await Promise.all([
            UserRepository.getUserWithRoles({
                name: 'slug',
                value: req.params.slug,
            }),
            RoleRepository.baseGet(),
        ]);
        return res.render('modules/users/admin/edit', {
            user, roles,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const update = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.mapped());
        req.flash('oldValue', data);
        return res.redirectBack();
    }
    try {
        await UserRepository.update(data, req.params.id, req.session.cUser._id);
        if (req.params.id === req.session.cUser._id) {
            const user = await UserRepository.getUserWithRoles({
                name: 'id',
                value: req.session.cUser._id,
            });
            req.session.cUser = AuthRepository.getCurrentUserData(user);
        }
        req.flash('success', 'Chỉnh sửa thành công');

        return res.redirectBack();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    try {
        await UserRepository.deleteById(req.params.id);
        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    showProfile,
    updateProfile,
    uploadOriginalAvatar,
    uploadAvatar,
    showRegisterForm,
    register,
    edit,
    update,
    destroy,
};
