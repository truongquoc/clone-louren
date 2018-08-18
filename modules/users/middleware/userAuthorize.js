const responseHelper = require('../../../helpers/responseHelper');
const roleHelper = require('../../../helpers/roleHelper');
const UserRepositoryClass = require('../repositories/UserRepository');

const UserRepository = new UserRepositoryClass();

const indexAuthorize = (req, res, next) => {
    next();
};

const registerAuthorize = (req, res, next) => {
    // Authorize
    next();
};

const showProfileAuthorize = async (req, res, next) => {
    try {
        const condition = (req.params.slug) ? { slug: req.params.slug } : { _id: req.params.id };
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
    try {
        const condition = (req.params.slug) ? { slug: req.params.slug } : { _id: req.params.id };
        const user = await UserRepository.checkExist(condition);
        if (!user) {
            return next(responseHelper.notFound());
        }
        next();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const destroyAuthorize = async (req, res, next) => {
    try {
        if (req.params.id === req.session.cUser._id) {
            return res.json(responseHelper.notAuthorized());
        }
        const user = await UserRepository.getUserWithRoles(req.params.id);
        if (!user) {
            return res.json(responseHelper.notFound());
        }
        if (roleHelper.hasRole(user, 'Admin') && !roleHelper.hasRole(req.session.cUser, 'Admin')) {
            return res.json(responseHelper.notAuthorized());
        }
        next();
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = { indexAuthorize, showProfileAuthorize, editAuthorize, registerAuthorize, destroyAuthorize };
