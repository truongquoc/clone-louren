const ResponseHelper = require('../../../helpers/response.helper');
const BlogCategoryRepository = new (require('../repositories/blogCategoryRepository'))();

const indexAuthorize = (req, res, next) => {
    next();
};

const editAuthorize = async (req, res, next) => {
    const { id } = req.params;
    try {
        const check = await BlogCategoryRepository.checkExist({ _id: id });
        // Authorize user
        if (!check) {
            return res.json(ResponseHelper.notFound());
        }
        next();
    } catch (e) {
        return res.json(ResponseHelper.error(e.message));
    }
};

module.exports = { indexAuthorize, editAuthorize };
