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
        const tempConditions = JSON.parse(await getRedisAsync('conditions') || '[]');
        const tempSearchConditions = JSON.parse(await getRedisAsync('searchConditions') || '[]');

        return res.render('modules/propertyConditions/admin/list', {
            propertyConditions,
            tempConditions,
            tempSearchConditions,
            query,
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
        const deleteTemp = async (name) => {
            const totalTempConditions = JSON.parse(await getRedisAsync(name) || '[]');
            const conditionsIndex = totalTempConditions.indexOf(id);
            if (conditionsIndex < 0) {
                return false;
            }
            totalTempConditions.splice(conditionsIndex, 1);
            client.set(name, JSON.stringify(totalTempConditions));
            return true;
        };
        const conditions = await deleteTemp('conditions');
        const searchConditions = await deleteTemp('searchConditions');
        await PropertyConditionRepository.deleteById(id);

        return res.json(responseHelper.success({
            conditions,
            searchConditions,
        }));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const changeTemp = async (req, res) => {
    const { type } = req.body;
    const redisConditionType = (type === 'search') ? 'searchConditions' : 'conditions';
    const totalTempConditions = JSON.parse(await getRedisAsync(redisConditionType) || '[]');
    const conditionIndex = totalTempConditions.indexOf(req.params.id);
    const result = {};
    if (conditionIndex >= 0) {
        totalTempConditions.splice(conditionIndex, 1);
        result.isSelected = false;
    } else {
        totalTempConditions.push(req.params.id);
        result.isSelected = true;
    }
    client.set(redisConditionType, JSON.stringify(totalTempConditions));

    return res.json(responseHelper.success(result));
};

module.exports = {
    index,
    store,
    update,
    destroy,
    changeTemp,
};
