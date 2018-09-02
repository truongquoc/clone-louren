const url = require('url');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');
const PropertyCategoryRepositoryClass = require('../repositories/PropertyCategoryRepository');
const PropertyStatusRepositoryClass = require('../../propertyStatuses/repositories/PropertyStatusRepository');
const PropertyTypeRepositoryClass = require('../../propertyTypes/repositories/PropertyTypeRepository');
const CityRepositoryClass = require('../../cities/repositories/CityRepository');
const DistrictRepositoryClass = require('../../districts/repositories/DistrictRepository');
const PropertyAmenityRepositoryClass = require('../../propertyAmenities/repositories/PropertyAmenityRepository');
const PropertyArticleRepositoryClass = require('../../propertyArticles/repositories/PropertyArticleRepository');

const PropertyCategoryRepository = new PropertyCategoryRepositoryClass();
const PropertyStatusRepository = new PropertyStatusRepositoryClass();
const PropertyTypeRepository = new PropertyTypeRepositoryClass();
const CityRepository = new CityRepositoryClass();
const DistrictRepository = new DistrictRepositoryClass();
const PropertyAmenityRepository = new PropertyAmenityRepositoryClass();
const PropertyArticleRepository = new PropertyArticleRepositoryClass();

const getClassifications = () => ([
    PropertyStatusRepository.baseGet(),
    PropertyTypeRepository.baseGet(),
    CityRepository.baseGet(),
    DistrictRepository.baseGet(),
]);

const index = async (req, res, next) => {
    const { query } = req;
    try {
        const propertyCategory = await PropertyCategoryRepository.checkExistBySlug(req.params.slug, { select: '_id name slug' });
        const data = getClassifications();
        data.push(PropertyAmenityRepository.baseGet());
        data.push(PropertyArticleRepository.clientList({
            value: propertyCategory._id,
            name: 'category',
        }, { pageUrl: url.parse(req.originalUrl).pathname, query }));
        const [
            propertyStatuses,
            propertyTypes,
            cities,
            districts,
            propertyAmenities,
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
        const propertyCategory = await PropertyCategoryRepository.checkExistBySlug(req.params.slug, { select: '_id name slug' });
        const data = getClassifications();
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
            propertyArticles,
            query,
        });
    } catch (e) {
        throw e;
        next(responseHelper.error(e.message));
    }
};

module.exports = { index, search };
