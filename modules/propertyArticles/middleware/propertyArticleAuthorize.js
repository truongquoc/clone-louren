const PropertyArticleRepositoryClass = require('../repositories/PropertyArticleRepository');
const responseHelper = require('../../../helpers/responseHelper');
const roleHelper = require('../../../helpers/roleHelper');

const PropertyArticleRepository = new PropertyArticleRepositoryClass();

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
        return next(responseHelper.notAuthorized());
    }
    const condition = req.params.slug ? { slug: req.params.slug } : { _id: req.params.id };
    try {
        const article = await PropertyArticleRepository.getDetail(condition, { select: 'author' });
        if (!article) {
            return next(responseHelper.notFound());
        }
        if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Property Manager'])
            && article.author.toString() !== req.session.cUser._id) {
            return next(responseHelper.notAuthorized());
        }
        next();
    } catch (e) {
        next(responseHelper.error(e.message));
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

const destroyAuthorize = async (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Property Manager', 'Property Writer'])) {
        return res.json(responseHelper.notAuthorized());
    }
    try {
        const article = await PropertyArticleRepository.getDetail({
            _id: req.params.id,
        }, { select: 'author' });
        if (!article) {
            return res.json(responseHelper.notFound());
        }
        if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Property Manager'])
            && article.author.toString() !== req.session.cUser._id) {
            return res.json(responseHelper.notAuthorized());
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

const clientEditAuthorize = async (req, res, next) => {
    const condition = req.params.slug ? { slug: req.params.slug } : { _id: req.params.id };
    try {
        const article = await PropertyArticleRepository.getDetail(condition, { select: 'author' });
        if (!article) {
            return next(responseHelper.notFound());
        }
        if (article.author.toString() !== req.session.cUser._id) {
            return next(responseHelper.notAuthorized());
        }
        next();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const clientDestroyAuthorize = async (req, res, next) => {
    try {
        const article = await PropertyArticleRepository.getDetail({
            _id: req.params.id,
        }, { select: 'author' });
        if (!article) {
            return res.json(responseHelper.notFound());
        }
        if (article.author.toString() !== req.session.cUser._id) {
            return res.json(responseHelper.notAuthorized());
        }
        next();
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    indexAuthorize,
    showMyArticlesAuthorize,
    editAuthorize,
    approveAuthorize,
    destroyAuthorize,
    clientShowMyArticlesAuthorize,
    showArticleAuthorize,
    clientEditAuthorize,
    clientDestroyAuthorize,
};
