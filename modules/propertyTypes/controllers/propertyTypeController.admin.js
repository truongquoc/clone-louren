const { validationResult } = require('express-validator/check');
const PropertyTypeRepositoryClass = require('../repositories/PropertyTypeRepository');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');

const PropertyTypeRepository = new PropertyTypeRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const propertyTypes = await PropertyTypeRepository.paginate({}, {
            pageUrl: req.baseUrl,
            query,
        });
        propertyTypes.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/propertyTypes/admin/list', {
            propertyTypes,
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
        const type = await PropertyTypeRepository.create(data);

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
        const type = await PropertyTypeRepository.update(data, req.params.id);

        return res.json(responseHelper.success(type));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await PropertyTypeRepository.delete(id);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index, store, update, destroy,
};
