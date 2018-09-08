const url = require('url');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');
const { getSearchData } = require('../../../infrastructure/controllers/baseController.client');
const PropertyStatusRepositoryClass = require('../../propertyStatuses/repositories/PropertyStatusRepository');
const PropertyArticleRepositoryClass = require('../../propertyArticles/repositories/PropertyArticleRepository');

const PropertyStatusRepository = new PropertyStatusRepositoryClass();
const PropertyArticleRepository = new PropertyArticleRepositoryClass();

const list = async (req, res, next) => {
    const { query } = req;
    try {
        const propertyStatus = await PropertyStatusRepository.getDetailBySlug(req.params.slug);
        const data = await getSearchData();
        data.push(PropertyArticleRepository.clientList({
            name: 'status',
            value: propertyStatus._id,
        }, {
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

        return res.render('modules/propertyStatuses/client/list', {
            propertyTypes,
            cities,
            districts,
            propertyAmenities,
            propertyConditions,
            propertyStatus,
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
        const propertyStatus = await PropertyStatusRepository.getDetailBySlug(req.params.slug);
        const data = await getSearchData();
        data.push(PropertyArticleRepository.clientList({
            name: 'status',
            value: propertyStatus._id,
        }, {
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

        return res.render('modules/propertyStatuses/client/search', {
            propertyTypes,
            cities,
            districts,
            propertyAmenities,
            propertyConditions,
            propertyStatus,
            propertyArticles,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    list,
    search,
};
