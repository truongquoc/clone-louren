const { validationResult } = require('express-validator/check');
const PriceTypeRepositoryClass = require('../repositories/PriceTypeRepository');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');

const PriceTypeRepository = new PriceTypeRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const priceTypes = await PriceTypeRepository.paginate({}, {
            pageUrl: req.baseUrl,
            query,
        });
        priceTypes.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/priceTypes/admin/list', {
            priceTypes,
            query,
        });
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

const store = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(responseHelper.error(errors.mapped(), 400));
    }
    try {
        const data = req.body;
        const priceType = await PriceTypeRepository.create(data);

        return res.json(responseHelper.success(priceType));
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
        const priceType = await PriceTypeRepository.update(data, req.params.id);

        return res.json(responseHelper.success(priceType));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await PriceTypeRepository.delete(id);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index, store, update, destroy,
};
