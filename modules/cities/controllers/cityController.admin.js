const { validationResult } = require('express-validator/check');
const CityRepositoryClass = require('../repositories/CityRepository');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');

const CityRepository = new CityRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const cities = await CityRepository.paginate({}, {
            pageUrl: req.baseUrl,
            query,
        });
        cities.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/cities/admin/list', {
            cities,
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
        const city = await CityRepository.create(data);

        return res.json(responseHelper.success(city));
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
        const city = await CityRepository.update(data, req.params.id);

        return res.json(responseHelper.success(city));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await CityRepository.delete(id);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index, store, update, destroy,
};
