const url = require('url');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');
const ProductTypeRepositoryClass = require('../repositories/ProductTypeRepository');
const ProductRepositoryClass = require('../../products/repositories/ProductRepository');

const ProductTypeRepository = new ProductTypeRepositoryClass();
const ProductRepository = new ProductRepositoryClass();

const index = async (req, res, next) => {
    const { query } = req;
    try {
        const productType = await ProductTypeRepository.getDetailBySlug(req.params.slug);
        const products = await ProductRepository.clientList({
            name: 'type',
            value: productType._id,
        }, {
            pageUrl: url.parse(req.originalUrl).pathname,
            query,
        });
        products.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/productTypes/client/list', {
            productType,
            products,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const getDiscountedProducts = async (req, res, next) => {
    const { query } = req;
    try {
        const products = await ProductRepository.clientList({
            name: 'discountProducts',
        }, {
            pageUrl: url.parse(req.originalUrl).pathname,
            query,
        });
        products.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/productTypes/client/discountedProducts', {
            products,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    getDiscountedProducts,
};
