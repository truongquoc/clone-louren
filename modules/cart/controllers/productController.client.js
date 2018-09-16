const ProductRepositoryClass = require('../repositories/productRepository');
const paginationHelper = require('../../../helpers/paginationHelper');
const responseHelper = require('../../../helpers/responseHelper');

const ProductRepository = new ProductRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const [products] = await Promise.all([
            ProductRepository.clientList(undefined, {
                query,
                pageUrl: req.baseUrl,
            }),
        ]);
        products.renderPagination = paginationHelper.renderPagination;
        return res.render('modules/products/client/list', {
            products, query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const show = async (req, res, next) => {
    try {
        // , productCategories, recentProducts
        // PropertyCategoryRepository.get(),
        // PropertyArticleRepository.getRecentArticles(),
        const [product] = await Promise.all([
            ProductRepository.show(req.params.slug),
        ]);
        return res.render('modules/products/client/detail', {
            product,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = { index, show };
