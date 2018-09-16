const responseHelper = require('../../helpers/responseHelper');
const ProductTypeRepositoryClass = require('../../modules/productTypes/repositories/ProductTypeRepository');

const ProductTypeRepository = new ProductTypeRepositoryClass();

const getPropertyTypes = async (req, res, next) => {
    try {
        res.locals.productTypes = await ProductTypeRepository.get();
        next();
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    getPropertyTypes,
};
