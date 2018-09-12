const { validationResult } = require('express-validator/check');
const DistrictRepositoryClass = require('../repositories/DistrictRepository');
const CityRepositoryClass = require('../../cities/repositories/CityRepository');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');

const DistrictRepository = new DistrictRepositoryClass();
const CityRepository = new CityRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const [districts, cities] = await Promise.all([
            DistrictRepository.list({
                pageUrl: req.baseUrl,
                query,
            }),
            CityRepository.baseGet(),
        ]);
        districts.renderPagination = paginationHelper.renderPagination;
        return res.render('modules/districts/admin/list', {
            districts,
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
        const district = await DistrictRepository.create(data);

        return res.json(responseHelper.success(district));
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
        const district = await DistrictRepository.update(data, req.params.id);

        return res.json(responseHelper.success(district));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await DistrictRepository.delete(id);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index, store, update, destroy,
};
