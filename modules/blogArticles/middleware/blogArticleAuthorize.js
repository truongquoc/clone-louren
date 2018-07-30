const responseHelper = require('../../../helpers/responseHelper');
const BlogArticleRepositoryClass = require('../repositories/BlogArticleRepository');

const BlogArticleRepository = new BlogArticleRepositoryClass();

const indexAuthorize = (req, res, next) => {
    next();
};

const showMyArticlesAuthorize = (req, res, next) => {
    next();
};

const approveAuthorize = async (req, res, next) => {
    try {
        // Validate Role Here
        const article = await BlogArticleRepository.checkExist({
            _id: req.params.id,
        });
        if (article) {
            next();
        }
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const deleteAuthorize = async (req, res, next) => {
    try {
        // Validate Role Here
        const article = await BlogArticleRepository.checkExist({
            _id: req.params.id,
        }, { select: 'author' });
        if (article) {
            next();
        }
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    indexAuthorize, showMyArticlesAuthorize, approveAuthorize, deleteAuthorize,
};
