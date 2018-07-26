const ResponseHelper = require('../../../helpers/response.helper');
const BlogTagRepository = new (require('../repositories/blogTagRepository'))();

const indexAuthorize = (req, res, next) => {
    next();
};

const editAuthorize = async (req, res, next) => {
    const { id } = req.params;
    try {
        const check = await BlogTagRepository.checkExist({ _id: id });
        if (!check) {
            return res.json(ResponseHelper.notFound());
        }
        next();
    } catch (e) {
        return res.json(ResponseHelper.error(e.message)); 
    }
};

module.exports = { indexAuthorize, editAuthorize };
