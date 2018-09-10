const PropertyArticleRepositoryClass = require('../repositories/PropertyArticleRepository');
const UserRepositoryClass = require('../../users/repositories/UserRepository');
const responseHelper = require('../../../helpers/responseHelper');
const roleHelper = require('../../../helpers/roleHelper');
const commonConstant = require('../../../constants/commonConstant');

const PropertyArticleRepository = new PropertyArticleRepositoryClass();
const UserRepository = new UserRepositoryClass();

const indexAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Property Manager'])) {
        return next(responseHelper.notAuthorized());
    }
    next();
};

const showMyArticlesAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Property Manager', 'Property Writer'])) {
        return next(responseHelper.notAuthorized());
    }
    next();
};

const editAuthorize = async (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Property Manager', 'Property Writer'])) {
        const response = responseHelper.notAuthorized();
        return req.xhr ? res.json(response) : next(response);
    }
    const condition = req.params.slug ? { slug: req.params.slug } : { _id: req.params.id };
    try {
        const article = await PropertyArticleRepository.getDetail(condition, { select: 'author' });
        if (!article) {
            const response = responseHelper.notFound();
            return req.xhr ? res.json(response) : next(response);
        }
        if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Property Manager'])
            && article.author.toString() !== req.session.cUser._id) {
            const response = responseHelper.notAuthorized();
            return req.xhr ? res.json(response) : next(response);
        }
        next();
    } catch (e) {
        const response = responseHelper.error(e.message);
        return req.xhr ? res.json(response) : next(response);
    }
};

const approveAuthorize = async (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Property Manager'])) {
        return res.json(responseHelper.notAuthorized());
    }
    try {
        // Validate Role Here
        const article = await PropertyArticleRepository.checkExist({
            _id: req.params.id,
        });
        if (!article) {
            return res.json(responseHelper.notFound());
        }
        next();
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const showArticleAuthorize = async (req, res, next) => {
    try {
        const article = await PropertyArticleRepository.checkExist({
            slug: req.params.slug,
        }, {
            select: 'author isDraft isApproved',
        });
        if (article) {
            if (article.isApproved && !article.isDraft) {
                return next();
            }
            if ((!article.isApproved || article.isDraft) && req.session.cUser
                && (roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Property Manager'])
                || req.session.cUser._id === article.author.toString())) {
                return next();
            }
        }
        next(responseHelper.notFound());
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const clientShowMyArticlesAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Property Manager', 'Property Writer', 'User'])) {
        return next(responseHelper.notAuthorized());
    }
    next();
};

const clientCreateArticleAuthorize = async (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Property Manager', 'Property Writer', 'User'])) {
        return next(responseHelper.notAuthorized());
    }
    if (roleHelper.hasRoleOnly(req.session.cUser, 'User')) {
        const user = await UserRepository.getById(req.session.cUser._id, {
            select: 'articles',
        });
        if (user.articles.published > commonConstant.userMaxPublishedArticlesQuantity) {
            return next(responseHelper.notAuthorized());
        }
    }
    next();
};

const clientEditAuthorize = async (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Property Manager', 'Property Writer', 'User'])) {
        const response = responseHelper.notAuthorized();
        return req.xhr ? res.json(response) : next(response);
    }
    const condition = req.params.slug ? { slug: req.params.slug } : { _id: req.params.id };
    try {
        const article = await PropertyArticleRepository.getDetail(condition, { select: 'author' });
        if (!article) {
            const response = responseHelper.notFound();
            return req.xhr ? res.json(response) : next(response);
        }
        if (article.author.toString() !== req.session.cUser._id) {
            const response = responseHelper.notAuthorized();
            return req.xhr ? res.json(response) : next(response);
        }
        next();
    } catch (e) {
        const response = responseHelper.error(e.message);
        return req.xhr ? res.json(response) : next(response);
    }
};

module.exports = {
    indexAuthorize,
    showMyArticlesAuthorize,
    editAuthorize,
    approveAuthorize,
    clientShowMyArticlesAuthorize,
    clientCreateArticleAuthorize,
    showArticleAuthorize,
    clientEditAuthorize,
};
