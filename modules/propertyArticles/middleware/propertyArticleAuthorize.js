const PropertyArticleRepositoryClass = require('../repositories/PropertyArticleRepository');
const responseHelper = require('../../../helpers/responseHelper');

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

const createAuthorize = (req, res, next) => {
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

module.exports = {
    indexAuthorize,
    showMyArticlesAuthorize,
    createAuthorize,
    editAuthorize,
    approveAuthorize,
    destroyAuthorize,
};
