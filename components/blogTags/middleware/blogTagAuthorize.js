const ResponseHelper = require('../../../helpers/response.helper');
const BlogTagRepository = new (require('../repositories/blogTagRepositotiy'))();

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

module.exports = { editAuthorize };