const responseHelper = require('../../../helpers/responseHelper');
const BlogArticleRepositoryClass = require('../repositories/BlogArticleRepository');

const BlogArticleRepository = new BlogArticleRepositoryClass();

const indexAuthorize = (req, res, next) => {
    next();
};

const showMyArticlesAuthorize = (req, res, next) => {
    next();
};

const showAuthorize = async (req, res, next) => {
    try {
        const article = await BlogArticleRepository.checkExist({
            isApproved: true,
            isDraft: false,
            slug: req.params.slug,
        });
        if (article) {
            return next();
        }
        next(responseHelper.notFound());
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const createArticleAuthorize = (req, res, next) => {
    next();
};

const editAuthorize = async (req, res, next) => {
    const condition = req.params.slug ? { slug: req.params.slug } : { _id: req.params.id };
    try {
        const article = await BlogArticleRepository.checkExist(condition);
        if (!article) {
            return next(responseHelper.notFound());
        }
        next();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const approveAuthorize = async (req, res, next) => {
    try {
        // Validate Role Here
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

const deleteAuthorize = async (req, res, next) => {
    try {
        // Validate Role Here
        const article = await BlogArticleRepository.getDetail({
            _id: req.params.id,
        }, { select: 'author' });
        if (!article) {
            return res.json(responseHelper.notFound());
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
    deleteAuthorize,
};
