const ResponseHelper = require('../../../helpers/response.helper');
const BlogCategoryRepository = new (require('../repositories/blogCategoryRepository'))();

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

module.exports = { editAuthorize };
