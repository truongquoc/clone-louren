const responseHelper = require('../../../helpers/responseHelper');
const BlogCategoryRepositoryClass = require('../repositories/BlogCategoryRepository');

const BlogCategoryRepository = new BlogCategoryRepositoryClass();

const indexAuthorize = (req, res, next) => {
    next();
};

const showArticlesAuthorize = async (req, res, next) => {
    try {
        const category = await BlogCategoryRepository.checkExistBySlug(req.params.slug);
        if (category) {
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
        const check = await BlogCategoryRepository.checkExist({ _id: id });
        // Authorize user
        if (!check) {
            return res.json(responseHelper.notFound());
        }
        next();
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = { indexAuthorize, showArticlesAuthorize, editAuthorize };
