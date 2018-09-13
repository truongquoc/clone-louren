const { validationResult } = require('express-validator/check');
const ProductTypeRepositoryClass = require('../repositories/ProductTypeRepository');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');

const ProductTypeRepository = new ProductTypeRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const productTypes = await ProductTypeRepository.list({
            pageUrl: req.baseUrl,
            query,
        });
        productTypes.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/productTypes/admin/list', {
            productTypes, query,
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
        const type = await ProductTypeRepository.create(data);

        return res.json(responseHelper.success(type));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(responseHelper.error(errors.mapped(), 400));
    }
    try {
        const data = req.body;
        const type = await ProductTypeRepository.update(data, req.params.id);

        return res.json(responseHelper.success(type));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await ProductTypeRepository.delete(id);

        return res.json(responseHelper.success(id));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const revert = async (req, res) => {
    const { id } = req.params;
    try {
        await ProductTypeRepository.revert(id);

        return res.json(responseHelper.success(id));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index, store, update, destroy, revert,
};
