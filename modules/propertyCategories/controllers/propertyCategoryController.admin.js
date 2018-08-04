const { validationResult } = require('express-validator/check');
const PropertyCategoryRepositoryClass = require('../repositories/PropertyCategoryRepository');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');

const PropertyCategoryRepository = new PropertyCategoryRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const propertyCategories = await PropertyCategoryRepository.paginate({}, {
            pageUrl: req.baseUrl,
            query,
        });
        propertyCategories.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/propertyCategories/admin/list', {
            propertyCategories,
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
        const category = await PropertyCategoryRepository.create(data);

        return res.json(responseHelper.success(category));
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
        const category = await PropertyCategoryRepository.update(data, req.params.id);

        return res.json(responseHelper.success(category));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await PropertyCategoryRepository.delete(id);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index, store, update, destroy,
};
