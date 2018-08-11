const responseHelper = require('../../../helpers/responseHelper');
const BlogTagRepositoryClass = require('../repositories/BlogTagRepository');

const BlogTagRepository = new BlogTagRepositoryClass();

const indexAuthorize = (req, res, next) => {
    next();
};

const showArticlesAuthorize = async (req, res, next) => {
    try {
        const check = await BlogTagRepository.checkExistBySlug(req.params.slug, { select: '_id' });
        if (check) {
            return next();
        }
        next(responseHelper.notFound());
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const editAuthorize = async (req, res, next) => {
    const { id } = req.params;
    try {
        const check = await BlogTagRepository.checkExist({ _id: id });
        if (!check) {
            return res.json(responseHelper.notFound());
        }
        return next();
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = { indexAuthorize, showArticlesAuthorize, editAuthorize };
