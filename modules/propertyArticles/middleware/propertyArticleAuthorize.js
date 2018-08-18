const PropertyArticleRepositoryClass = require('../repositories/PropertyArticleRepository');
const responseHelper = require('../../../helpers/responseHelper');

const PropertyArticleRepository = new PropertyArticleRepositoryClass();

const indexAuthorize = (req, res, next) => {
    next();
};

const showMyArticlesAuthorize = (req, res, next) => {
    next();
};

const createAuthorize = (req, res, next) => {
    next();
};

const editAuthorize = async (req, res, next) => {
    const condition = req.params.slug ? { slug: req.params.slug } : { _id: req.params.id };
    try {
        const article = await PropertyArticleRepository.checkExist(condition);
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
    try {
        // Validate Role Here
        const article = await PropertyArticleRepository.getDetail({
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
    createAuthorize,
    editAuthorize,
    approveAuthorize,
    destroyAuthorize,
};
