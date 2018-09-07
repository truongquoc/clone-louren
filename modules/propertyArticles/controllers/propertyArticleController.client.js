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
const PropertyConditionRepositoryClass = require('../../propertyConditions/repositories/PropertyConditionRepository');
const PriceTypeRepositoryClass = require('../../priceTypes/repositories/PriceTypeRepository');
const UploadRepositoryClass = require('../../../infrastructure/repositories/UploadRepository');
const PropertyArticleRepositoryClass = require('../repositories/PropertyArticleRepository');

const PropertyCategoryRepository = new PropertyCategoryRepositoryClass();
const PropertyStatusRepository = new PropertyStatusRepositoryClass();
const PropertyTypeRepository = new PropertyTypeRepositoryClass();
const CityRepository = new CityRepositoryClass();
const DistrictRepository = new DistrictRepositoryClass();
const BlogArticleRepository = new BlogArticleRepositoryClass();
const PropertyAmenityRepository = new PropertyAmenityRepositoryClass();
const PropertyConditionRepository = new PropertyConditionRepositoryClass();
const PriceTypeRepository = new PriceTypeRepositoryClass();
const UploadRepository = new UploadRepositoryClass();
const PropertyArticleRepository = new PropertyArticleRepositoryClass();

const getClassifications = () => [
    PropertyStatusRepository.baseGet(),
    PropertyTypeRepository.baseGet(),
    CityRepository.baseGet(),
    DistrictRepository.baseGet(),
];

const getDataForCreatingArticle = () => getClassifications().concat([
    PropertyAmenityRepository.baseGet(),
    PropertyConditionRepository.baseGet(),
    PropertyCategoryRepository.baseGet(),
    PriceTypeRepository.baseGet(),
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
        const data = getClassifications();
        data.push(PropertyAmenityRepository.baseGet());
        data.push(PropertyArticleRepository.clientList({}, {
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

        return res.render('modules/propertyArticles/client/list', {
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

const showMyArticles = async (req, res, next) => {
    try {
        const { query } = req;
        const propertyArticles = await PropertyArticleRepository.adminList(req.session.cUser._id, {
            query,
            pageUrl: url.parse(req.originalUrl).pathname,
            select: 'title address display.image price.display isApproved slug createdAt',
        });
        propertyArticles.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/propertyArticles/client/me', {
            propertyArticles, query,
        });
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

const create = async (req, res, next) => {
    try {
        const [
            propertyStatuses,
            propertyTypes,
            cities,
            districts,
            propertyAmenities,
            propertyConditions,
            propertyCategories,
            priceTypes,
        ] = await Promise.all(getDataForCreatingArticle());

        return res.render('modules/propertyArticles/client/create', {
            propertyAmenities,
            propertyConditions,
            propertyCategories,
            propertyTypes,
            propertyStatuses,
            cities,
            districts,
            priceTypes,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const edit = (req, res) => {
    return res.render('modules/propertyArticles/client/create');
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await PropertyArticleRepository.deleteById(id);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    list,
    search,
    show,
    create,
    edit,
    showMyArticles,
    destroy,
};
