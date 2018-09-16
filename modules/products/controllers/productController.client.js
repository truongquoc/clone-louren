const url = require('url');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');
const ProductRepositoryClass = require('../../products/repositories/ProductRepository');

const ProductRepository = new ProductRepositoryClass();

const index = async (req, res, next) => {
    const { query } = req;
    try {
        const newestProducts = await ProductRepository.getNewestProducts();
        console.log(newestProducts);

        return res.render('modules/products/client/index', {
            newestProducts,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const list = async (req, res, next) => {
    const { query } = req;
    try {
        const products = await ProductRepository.clientList(undefined, {
            pageUrl: url.parse(req.originalUrl).pathname,
            query,
        });
        products.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/products/client/list', {
            products,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const search = async (req, res, next) => {
    const { query } = req;
    try {
        const products = await ProductRepository.clientSearch({
            pageUrl: url.parse(req.originalUrl).pathname,
            query,
        });
        products.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/products/client/search', {
            products,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    list,
    search,
};
