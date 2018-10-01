const { validationResult } = require('express-validator/check');
const ProductTagRepositoryClass = require('../repositories/ProductTagRepository');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');

const ProductTagRepository = new ProductTagRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const productTags = await ProductTagRepository.paginate({}, {
            pageUrl: req.baseUrl,
            query,
        });
        productTags.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/productTags/admin/list', {
            productTags, query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const store = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(responseHelper.error(errors.mapped(), 400));
    }
    try {
        const data = req.body;
        const tag = await ProductTagRepository.create(data);

        return res.json(responseHelper.success(tag));
    } catch (e) {
        return res.json(responseHelper.error(Element.message));
    }
};

const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(responseHelper.error(errors.mapped(), 400));
    }
    try {
        const data = req.body;
        const tag = await ProductTagRepository.update(data, req.params.id);

        return res.json(responseHelper.success(tag));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await ProductTagRepository.deleteById(id);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index, store, update, destroy,
};
