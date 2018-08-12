const { validationResult } = require('express-validator/check');
const PropertyAmenityRepositoryClass = require('../repositories/PropertyAmenityRepository');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');

const PropertyAmenityRepository = new PropertyAmenityRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const propertyAmenities = await PropertyAmenityRepository.paginate({}, {
            pageUrl: req.baseUrl,
            query,
        });
        propertyAmenities.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/propertyAmenities/admin/list', {
            propertyAmenities,
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
        const amenity = await PropertyAmenityRepository.create(data);

        return res.json(responseHelper.success(amenity));
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
        const amenity = await PropertyAmenityRepository.update(data, req.params.id);

        return res.json(responseHelper.success(amenity));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await PropertyAmenityRepository.delete(id);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index, store, update, destroy,
};
