const url = require('url');
const ProductRepositoryClass = require('../../products/repositories/ProductRepository');
const ProductTagRepositoryClass = require('../repositories/ProductTagRepository');
const paginationHelper = require('../../../helpers/paginationHelper');
const responseHelper = require('../../../helpers/responseHelper');

const ProductRepository = new ProductRepositoryClass();
const ProductTagRepository = new ProductTagRepositoryClass();

const index = async (req, res, next) => {
    const { query } = req;
    try {
        const productTag = await ProductTagRepository.getDetailBySlug(req.params.slug);
        const [products] = await Promise.all([
            ProductRepository.clientList({
                name: 'tag',
                value: productTag._id,
            }, {
                query,
                pageUrl: url.parse(req.originalUrl).pathname,
            }),
        ]);
        products.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/productTags/client/list', {
            products, query, productTag,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = { index };
