const url = require('url');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');
const SlideRepositoryClass = require('../../slides/repositories/SlideRepository');
const ProductRepositoryClass = require('../../products/repositories/ProductRepository');

const SlideRepository = new SlideRepositoryClass();
const ProductRepository = new ProductRepositoryClass();

const index = async (req, res, next) => {
    const { query } = req;
    try {
        const [slides, newestProducts] = await Promise.all([
            SlideRepository.homeGetSlides(),
            ProductRepository.getNewestProducts(9),
        ]);

        return res.render('modules/products/client/index', {
            newestProducts,
            slides,
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
    query.search = query.search ? query.search.trim() : '';
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

const detail = async (req, res, next) => {
    const { slug } = req.params;

    try {
        const product = await ProductRepository.clientShow(slug);
        const productsRelated = await ProductRepository.getProductsByType(product.type);

        return res.render('modules/products/client/detail', {
            product,
            productsRelated,
        });
    } catch (e) {
       next(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    list,
    search,
    detail,
};
