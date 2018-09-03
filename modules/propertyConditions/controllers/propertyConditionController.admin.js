const { validationResult } = require('express-validator/check');
const redis = require('redis');
const { promisify } = require('util');
const PropertyConditionRepositoryClass = require('../repositories/PropertyConditionRepository');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');

const client = redis.createClient();
const getRedisAsync = promisify(client.get).bind(client);

const PropertyConditionRepository = new PropertyConditionRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const propertyConditions = await PropertyConditionRepository.paginate({}, {
            pageUrl: req.baseUrl,
            query,
        });
        propertyConditions.renderPagination = paginationHelper.renderPagination;
        const tempConditions = JSON.parse(await getRedisAsync('conditions')) || [];

        return res.render('modules/propertyConditions/admin/list', {
            propertyConditions,
            tempConditions,
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

const changeTemp = async (req, res) => {
    const totalTempConditions = JSON.parse(await getRedisAsync('conditions')) || [];
    const conditionIndex = totalTempConditions.indexOf(req.params.id);
    const result = {};
    if (conditionIndex >= 0) {
        totalTempConditions.splice(conditionIndex, 1);
        result.isSelected = false;
    } else {
        totalTempConditions.push(req.params.id);
        result.isSelected = true;
    }
    client.set('conditions', JSON.stringify(totalTempConditions));

    return res.json(responseHelper.success(result));
};

module.exports = {
    index,
    store,
    update,
    destroy,
    changeTemp,
};
