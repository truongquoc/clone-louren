const { promisify } = require('util');
const url = require('url');
const redis = require('redis');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');
const PropertyCategoryRepositoryClass = require('../repositories/PropertyCategoryRepository');
const PropertyStatusRepositoryClass = require('../../propertyStatuses/repositories/PropertyStatusRepository');
const PropertyTypeRepositoryClass = require('../../propertyTypes/repositories/PropertyTypeRepository');
const CityRepositoryClass = require('../../cities/repositories/CityRepository');
const DistrictRepositoryClass = require('../../districts/repositories/DistrictRepository');
const PropertyAmenityRepositoryClass = require('../../propertyAmenities/repositories/PropertyAmenityRepository');
const PropertyConditionRepositoryClass = require('../../propertyConditions/repositories/PropertyConditionRepository');
const PropertyArticleRepositoryClass = require('../../propertyArticles/repositories/PropertyArticleRepository');

const client = redis.createClient();
const getRedisAsync = promisify(client.get).bind(client);
const PropertyCategoryRepository = new PropertyCategoryRepositoryClass();
const PropertyStatusRepository = new PropertyStatusRepositoryClass();
const PropertyTypeRepository = new PropertyTypeRepositoryClass();
const CityRepository = new CityRepositoryClass();
const DistrictRepository = new DistrictRepositoryClass();
const PropertyAmenityRepository = new PropertyAmenityRepositoryClass();
const PropertyConditionRepository = new PropertyConditionRepositoryClass();
const PropertyArticleRepository = new PropertyArticleRepositoryClass();

const getSearchData = async () => {
    const conditions = await getRedisAsync('searchConditions') || '[]';
    return [
        PropertyStatusRepository.baseGet(),
        PropertyTypeRepository.baseGet(),
        CityRepository.baseGet(),
        DistrictRepository.baseGet(),
        PropertyAmenityRepository.baseGet(),
        PropertyConditionRepository.getManyByIds(JSON.parse(conditions)),
    ];
};

const index = async (req, res, next) => {
    const { query } = req;
    try {
        const propertyCategory = await PropertyCategoryRepository.getDetailBySlug(req.params.slug, { select: '_id name slug' });
        const data = getSearchData();
        data.push(PropertyArticleRepository.clientList({
            value: propertyCategory._id,
            name: 'category',
        }, {
            pageUrl: url.parse(req.originalUrl).pathname,
            query,
        }));
        const [
            propertyStatuses,
            propertyTypes,
            cities,
            districts,
            propertyAmenities,
            propertyConditions,
            propertyArticles,
        ] = await Promise.all(data);
        propertyArticles.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/propertyCategories/client/list', {
            propertyStatuses,
            propertyTypes,
            cities,
            districts,
            propertyCategory,
            propertyAmenities,
            propertyConditions,
            propertyArticles,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const search = async (req, res, next) => {
    const { query } = req;
    try {
        const propertyCategory = await PropertyCategoryRepository.getDetailBySlug(req.params.slug, { select: '_id name slug' });
        const data = getSearchData();
        data.push(PropertyAmenityRepository.baseGet());
        data.push(PropertyArticleRepository.clientList({
            value: propertyCategory._id,
            name: 'category',
        }, {
            pageUrl: url.parse(req.originalUrl).pathname,
            query,
        }));
        const [
            propertyStatuses,
            propertyTypes,
            cities,
            districts,
            propertyAmenities,
            propertyConditions,
            propertyArticles,
        ] = await Promise.all(data);
        propertyArticles.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/propertyCategories/client/search', {
            propertyStatuses,
            propertyTypes,
            cities,
            districts,
            propertyCategory,
            propertyAmenities,
            propertyConditions,
            propertyArticles,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = { index, search };
