const url = require('url');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');
const { getSearchData } = require('../../../infrastructure/controllers/baseController.client');
const PropertyStatusRepositoryClass = require('../../propertyStatuses/repositories/PropertyStatusRepository');
const PropertyCategoryRepositoryClass = require('../repositories/PropertyCategoryRepository');
const PropertyArticleRepositoryClass = require('../../propertyArticles/repositories/PropertyArticleRepository');

const PropertyStatusRepository = new PropertyStatusRepositoryClass();
const PropertyCategoryRepository = new PropertyCategoryRepositoryClass();
const PropertyArticleRepository = new PropertyArticleRepositoryClass();

const index = async (req, res, next) => {
    const { query } = req;
    try {
        const [propertyStatus, propertyCategory] = await Promise.all([
            PropertyStatusRepository.getDetailBySlug(req.params.typeSlug),
            PropertyCategoryRepository.getDetailBySlug(req.params.slug),
        ]);
        const data = await getSearchData();
        data.push(PropertyArticleRepository.clientList([{
            value: propertyStatus._id,
            name: 'status',
        }, {
            value: propertyCategory._id,
            name: 'category',
        }], {
            pageUrl: url.parse(req.originalUrl).pathname,
            query,
        }));
        const [
            propertyTypes,
            cities,
            districts,
            propertyAmenities,
            propertyConditions,
            propertyArticles,
        ] = await Promise.all(data);
        propertyArticles.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/propertyCategories/client/list', {
            propertyTypes,
            cities,
            districts,
            propertyAmenities,
            propertyConditions,
            propertyStatus,
            propertyCategory,
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
        const [propertyStatus, propertyCategory] = await Promise.all([
            PropertyStatusRepository.getDetailBySlug(req.params.typeSlug),
            PropertyCategoryRepository.getDetailBySlug(req.params.slug),
        ]);
        const data = await getSearchData();
        data.push(PropertyArticleRepository.clientList([{
            value: propertyStatus._id,
            name: 'status',
        }, {
            value: propertyCategory._id,
            name: 'category',
        }], {
            pageUrl: url.parse(req.originalUrl).pathname,
            query,
        }));
        const [
            propertyTypes,
            cities,
            districts,
            propertyAmenities,
            propertyConditions,
            propertyArticles,
        ] = await Promise.all(data);
        propertyArticles.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/propertyCategories/client/search', {
            propertyTypes,
            cities,
            districts,
            propertyAmenities,
            propertyConditions,
            propertyStatus,
            propertyCategory,
            propertyArticles,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    search,
};
