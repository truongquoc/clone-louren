const { validationResult } = require('express-validator/check');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');
const imageHelper = require('../../../helpers/imageHelper');
const storageHelper = require('../../../helpers/storage/storageHelper');
const dateHelper = require('../../../helpers/dateHelper');
const UserRepositoryClass = require('../repositories/UserRepository');
const RoleRepositoryClass = require('../repositories/RoleRepository');
const UploadRepositoryClass = require('../../../infrastructure/repositories/UploadRepository');

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

        return res.redirect('/admin/login');
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
        const user = await UserRepository.show(req.params.slug);
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
        await UserRepository.updateProfile(data, req.session.cUser._id);
        return res.redirectBack();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const uploadOriginalAvatar = async (req, res) => {
    let image = req.file;
    try {
        image = imageHelper.getOriginalImage(image);
        const url = await storageHelper.storage('s3').upload(`avatars/original/${dateHelper.getSlugCurrentTime()}.jpg`, image, 'public-read');
        await UploadRepository.create([url], req.session.cUser, true);

        return res.json(responseHelper.success(url));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const uploadAvatar = async (req, res) => {
    let image = req.file;
    try {
        image = imageHelper.optimizeImage(image, {
            width: 160,
            height: 160,
            quality: 80,
        });
        const url = await storageHelper.storage('s3').upload(`avatars/${dateHelper.getSlugCurrentTime()}.jpg`, image, 'public-read');
        await UploadRepository.create([url], req.session.cUser);

        return res.json(responseHelper.success(url));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const edit = async (req, res, next) => {
    try {
        const [user, roles] = await Promise.all([
            UserRepository.show(req.params.slug),
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
        await UserRepository.update(data, req.params.id);
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
