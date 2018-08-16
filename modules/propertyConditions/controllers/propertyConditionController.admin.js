const { validationResult } = require('express-validator/check');
const PropertyConditionRepositoryClass = require('../repositories/PropertyConditionRepository');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');

const PropertyConditionRepository = new PropertyConditionRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const propertyConditions = await PropertyConditionRepository.paginate({}, {
            pageUrl: req.baseUrl,
            query,
        });
        propertyConditions.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/propertyConditions/admin/list', {
            propertyConditions,
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
        const condition = await PropertyConditionRepository.create(data);

        return res.json(responseHelper.success(condition));
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
        const condition = await PropertyConditionRepository.update(data, req.params.id);

        return res.json(responseHelper.success(condition));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await PropertyConditionRepository.deleteById(id);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index, store, update, destroy,
};
