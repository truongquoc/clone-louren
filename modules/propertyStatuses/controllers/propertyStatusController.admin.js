const { validationResult } = require('express-validator/check');
const PropertyStatusRepositoryClass = require('../repositories/PropertyStatusRepository');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');

const PropertyStatusRepository = new PropertyStatusRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const propertyStatuses = await PropertyStatusRepository.paginate({}, {
            pageUrl: req.baseUrl,
            query,
        });
        propertyStatuses.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/propertyStatuses/admin/list', {
            propertyStatuses,
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
        const status = await PropertyStatusRepository.create(data);

        return res.json(responseHelper.success(status));
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
        const status = await PropertyStatusRepository.update(data, req.params.id);

        return res.json(responseHelper.success(status));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await PropertyStatusRepository.delete(id);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index, store, update, destroy,
};
