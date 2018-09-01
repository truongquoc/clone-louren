const url = require('url');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');
const PropertyCategoryRepositoryClass = require('../../propertyCategories/repositories/PropertyCategoryRepository');
const PropertyStatusRepositoryClass = require('../../propertyStatuses/repositories/PropertyStatusRepository');
const PropertyTypeRepositoryClass = require('../../propertyTypes/repositories/PropertyTypeRepository');
const CityRepositoryClass = require('../../cities/repositories/CityRepository');
const DistrictRepositoryClass = require('../../districts/repositories/DistrictRepository');
const BlogArticleRepositoryClass = require('../../blogArticles/repositories/BlogArticleRepository');
const PropertyAmenityRepositoryClass = require('../../propertyAmenities/repositories/PropertyAmenityRepository');
const PropertyArticleRepositoryClass = require('../repositories/PropertyArticleRepository');

const PropertyCategoryRepository = new PropertyCategoryRepositoryClass();
const PropertyStatusRepository = new PropertyStatusRepositoryClass();
const PropertyTypeRepository = new PropertyTypeRepositoryClass();
const CityRepository = new CityRepositoryClass();
const DistrictRepository = new DistrictRepositoryClass();
const BlogArticleRepository = new BlogArticleRepositoryClass();
const PropertyAmenityRepository = new PropertyAmenityRepositoryClass();
const PropertyArticleRepository = new PropertyArticleRepositoryClass();

const getClassifications = () => ([
    PropertyStatusRepository.baseGet(),
    PropertyTypeRepository.baseGet(),
    CityRepository.baseGet(),
    DistrictRepository.baseGet(),
]);

const index = async (req, res, next) => {
    try {
        const propertyCategories = await PropertyCategoryRepository.baseGet();
        const data = getClassifications();
        data.push(PropertyArticleRepository.homeList(propertyCategories));
        data.push(PropertyArticleRepository.homeGetNewest());
        data.push(BlogArticleRepository.homeGetNewest());
        const [
            propertyStatuses,
            propertyTypes,
            cities,
            districts,
            propertyArticlesByCategories,
            newestPropertyArticles,
            newestBlogArticles,
        ] = await Promise.all(data);

        return res.render('modules/propertyArticles/client/index', {
            propertyStatuses,
            propertyTypes,
            cities,
            districts,
            propertyArticlesByCategories,
            newestPropertyArticles,
            newestBlogArticles,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const list = async (req, res, next) => {
    const { query } = req;
    try {
        const data = getClassifications();
        data.push(PropertyAmenityRepository.baseGet());
        data.push(PropertyArticleRepository.clientList(undefined, {
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

        return res.render('modules/propertyCategories/client/list', {
            propertyStatuses,
            propertyTypes,
            cities,
            districts,
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
        const propertyArticles = await PropertyArticleRepository.clientList({}, {
            pageUrl: url.parse(req.originalUrl).pathname,
            query,
        });
        console.log(propertyArticles);

        // return res.render('modules/propertyArticles/client/list', {
        //     propertyArticles,
        //     query,
        // });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const show = async (req, res, next) => {
    const { query } = req;
    try {
        const data = getClassifications();
        data.push(PropertyAmenityRepository.baseGet());
        data.push(PropertyArticleRepository.show(req.params.slug));
        const [
            propertyStatuses,
            propertyTypes,
            cities,
            districts,
            propertyAmenities,
            propertyArticle,
        ] = await Promise.all(data);

        return res.render('modules/propertyArticles/client/detail', {
            propertyStatuses,
            propertyTypes,
            cities,
            districts,
            propertyAmenities,
            propertyArticle,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    list,
    search,
    show,
};
