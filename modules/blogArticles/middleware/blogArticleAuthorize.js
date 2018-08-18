const responseHelper = require('../../../helpers/responseHelper');
const roleHelper = require('../../../helpers/roleHelper');
const BlogArticleRepositoryClass = require('../repositories/BlogArticleRepository');

const BlogArticleRepository = new BlogArticleRepositoryClass();

const indexAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Blog Manager'])) {
        return next(responseHelper.notAuthorized());
    }
    next();
};

const showMyArticlesAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Blog Manager', 'Blogger'])) {
        return next(responseHelper.notAuthorized());
    }
    next();
};

const showAuthorize = async (req, res, next) => {
    try {
        const article = await BlogArticleRepository.checkExist({
            isApproved: true,
            isDraft: false,
            slug: req.params.slug,
        });
        if (!article) {
            return next(responseHelper.notFound());
        }
        next();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const createArticleAuthorize = (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Blog Manager', 'Blogger'])) {
        return next(responseHelper.notAuthorized());
    }
    next();
};

const editAuthorize = async (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Blog Manager', 'Blogger'])) {
        return next(responseHelper.notAuthorized());
    }
    const condition = req.params.slug ? { slug: req.params.slug } : { _id: req.params.id };
    try {
        const article = await BlogArticleRepository.getDetail(condition, { select: 'author' });
        if (!article) {
            return next(responseHelper.notFound());
        }
        if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Blog Manager'])
            && article.author.toString() !== req.session.cUser._id) {
            return next(responseHelper.notAuthorized());
        }
        next();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const approveAuthorize = async (req, res, next) => {
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Blog Manager'])) {
        return res.json(responseHelper.notAuthorized());
    }
    try {
        const article = await BlogArticleRepository.checkExist({
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
    if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Blog Manager', 'Blogger'])) {
        return res.json(responseHelper.notAuthorized());
    }
    try {
        const article = await BlogArticleRepository.getDetail({
            _id: req.params.id,
        }, { select: 'author' });
        if (!article) {
            return res.json(responseHelper.notFound());
        }
        if (!roleHelper.hasRole(req.session.cUser, ['Admin', 'Manager', 'Blog Manager'])
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
    showAuthorize,
    createArticleAuthorize,
    editAuthorize,
    approveAuthorize,
    destroyAuthorize,
};
