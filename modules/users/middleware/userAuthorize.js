const responseHelper = require('../../../helpers/responseHelper');
const roleHelper = require('../../../helpers/roleHelper');
const UserRepositoryClass = require('../repositories/UserRepository');

const UserRepository = new UserRepositoryClass();

const viewAdminAuthorize = (req, res, next) => {
    if (roleHelper.hasRoleOnly(req.session.cUser, 'User')) {
        return next(responseHelper.notAuthorized());
    }
    next();
};

const indexAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager'])) {
        return next(responseHelper.notAuthorized());
    }
    next();
};

const registerAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager'])) {
        return next(responseHelper.notAuthorized());
    }
    next();
};

const showProfileAuthorize = async (req, res, next) => {
    const { id, slug } = req.params;
    const { cUser } = req.session;
    if (!roleHelper.hasRole(cUser, ['Admin', 'Manager']) && (cUser.slug !== slug && cUser._id !== id)) {
        return next(responseHelper.notAuthorized());
    }
    try {
        const condition = (req.params.slug) ? { slug } : { _id: id };
        const user = await UserRepository.checkExist(condition);
        if (!user) {
            return next(responseHelper.notFound());
        }
        next();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const editAuthorize = async (req, res, next) => {
    const { cUser } = req.session;
    if (!roleHelper.hasRole(cUser, ['Admin', 'Manager'])) {
        return next(responseHelper.notAuthorized());
    }
    try {
        const condition = (req.params.slug) ? { name: 'slug', value: req.params.slug } : { name: 'id', value: req.params.id };
        const user = await UserRepository.getUserWithRoles(condition);
        if (!user) {
            return next(responseHelper.notFound());
        }
        if (roleHelper.hasRole(user, 'Admin') && !roleHelper.hasRole(cUser, 'Admin')) {
            return next(responseHelper.notAuthorized());
        }
        next();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const uploadAvatarAuthorize = async (req, res, next) => {
    if (req.params.id !== req.session.cUser._id) {
        return res.json(responseHelper.notAuthorized());
    }
    try {
        const user = await UserRepository.checkExist({ _id: req.params.id });
        if (!user) {
            return res.json(responseHelper.notFound());
        }
        next();
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroyAuthorize = async (req, res, next) => {
    const { cUser } = req.session;
    if (!roleHelper.hasRole(cUser, ['Admin', 'Manager'])) {
        return res.json(responseHelper.notAuthorized());
    }
    try {
        if (req.params.id === cUser._id) {
            return res.json(responseHelper.notAuthorized());
        }
        const user = await UserRepository.getUserWithRoles({ name: 'id', value: req.params.id });
        if (!user) {
            return res.json(responseHelper.notFound());
        }
        if (roleHelper.hasRole(user, 'Admin') && !roleHelper.hasRole(cUser, 'Admin')) {
            return res.json(responseHelper.notAuthorized());
        }
        next();
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    viewAdminAuthorize,
    indexAuthorize,
    showProfileAuthorize,
    editAuthorize,
    uploadAvatarAuthorize,
    registerAuthorize,
    destroyAuthorize,
};
