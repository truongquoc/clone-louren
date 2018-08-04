const responseHelper = require('../../../helpers/responseHelper');
const PropertyCategoryRepositoryClass = require('../repositories/PropertyCategoryRepository');

const PropertyCategoryRepository = new PropertyCategoryRepositoryClass();

const indexAuthorize = (req, res, next) => {
    next();
};

const editAuthorize = async (req, res, next) => {
    const { id } = req.params;
    try {
        const check = await PropertyCategoryRepository.checkExist({ _id: id });
        // Authorize user
        if (!check) {
            return res.json(responseHelper.notFound());
        }
        next();
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = { indexAuthorize, editAuthorize };
