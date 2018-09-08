const { validationResult } = require('express-validator/check');
const { promisify } = require('util');
const url = require('url');
const redis = require('redis');
const getSlug = require('speakingurl');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');
const hashidsHelper = require('../../../helpers/hashidsHelper');
const imageHelper = require('../../../helpers/imageHelper');
const dateHelper = require('../../../helpers/dateHelper');
const storageHelper = require('../../../helpers/storage/storageHelper');
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

const client = redis.createClient();
const getRedisAsync = promisify(client.get).bind(client);
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

const getHomeSearchData = () => [
    PropertyStatusRepository.baseGet(),
    PropertyTypeRepository.baseGet(),
    CityRepository.baseGet(),
    DistrictRepository.baseGet(),
];

const getSearchData = async () => {
    const conditions = await getRedisAsync('searchConditions') || '[]';
    return getHomeSearchData().concat([
        PropertyAmenityRepository.baseGet(),
        PropertyConditionRepository.getManyByIds(JSON.parse(conditions)),
    ]);
};

const getDataForCreatingArticle = () => getHomeSearchData().concat([
    PropertyAmenityRepository.baseGet(),
    PropertyConditionRepository.baseGet(),
    PropertyCategoryRepository.baseGet(),
    PriceTypeRepository.baseGet(),
]);

const index = async (req, res, next) => {
    try {
        const propertyCategories = await PropertyCategoryRepository.baseGet();
        const data = getHomeSearchData();
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
        const data = await getSearchData();
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
            propertyConditions,
            propertyArticles,
        ] = await Promise.all(data);
        propertyArticles.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/propertyCategories/client/list', {
            propertyStatuses,
            propertyTypes,
            cities,
            districts,
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
        const data = await getSearchData();
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
            propertyConditions,
            propertyArticles,
        ] = await Promise.all(data);
        propertyArticles.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/propertyArticles/client/list', {
            propertyStatuses,
            propertyTypes,
            cities,
            districts,
            propertyAmenities,
            propertyConditions,
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
        const data = await getSearchData();
        data.push(PropertyArticleRepository.show(req.params.slug));
        const [
            propertyStatuses,
            propertyTypes,
            cities,
            districts,
            propertyAmenities,
            propertyConditions,
            propertyArticle,
        ] = await Promise.all(data);

        return res.render('modules/propertyArticles/client/detail', {
            propertyStatuses,
            propertyTypes,
            cities,
            districts,
            propertyAmenities,
            propertyConditions,
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

const store = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        imageHelper.deleteImage(req.file, false);
        req.flash('oldValue', data);
        req.flash('errors', errors.mapped());
        return res.redirectBack();
    }
    data.createdTime = req.attributes.createdTime;
    try {
        const image = await imageHelper.optimizeImage(req.file, {
            width: 750,
            quality: 75,
        });
        data.image = await storageHelper.storage('s3').upload(`articles/${dateHelper.getSlugCurrentTime()}.jpg`, image, 'public-read');
        const article = await PropertyArticleRepository.create(data, req.session.cUser);
        return res.redirect(`/nguoi-dung/bai-viet-bat-dong-san/${article.slug}`);
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const edit = async (req, res, next) => {
    try {
        const data = getDataForCreatingArticle();
        data.push(PropertyArticleRepository.getEditArticle(req.params.slug));
        const [
            propertyStatuses,
            propertyTypes,
            cities,
            districts,
            propertyAmenities,
            propertyConditions,
            propertyCategories,
            priceTypes,
            propertyArticle,
        ] = await Promise.all(data);

        return res.render('modules/propertyArticles/client/edit', {
            propertyArticle,
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

const update = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        imageHelper.deleteImage(req.file, false);
        req.flash('oldValue', data);
        req.flash('errors', errors.mapped());
        return res.redirectBack();
    }
    data.createdTime = req.attributes.createdTime;
    try {
        if (req.file) {
            const image = await imageHelper.optimizeImage(req.file, {
                width: 750,
                quality: 75,
            });
            data.image = await storageHelper.storage('s3').upload(`articles/${dateHelper.getSlugCurrentTime()}.jpg`, image, 'public-read');
        }
        await PropertyArticleRepository.update(data, req.params.id);
        return res.redirect(`/nguoi-dung/bai-viet-bat-dong-san/${getSlug(`${data.title || data.slug}-${data.createdTime}`)}`);
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const listImages = async (req, res, next) => {
    try {
        const { query } = req;
        const [propertyArticle, images] = await Promise.all([
            PropertyArticleRepository.getEditArticle(req.params.slug),
            UploadRepository.listByArticles(req.session.cUser._id, {
                query,
                pageUrl: url.parse(req.originalUrl).pathname,
            }),
        ]);
        images.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/propertyArticles/client/listImages', {
            propertyArticle,
            images,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const showMap = async (req, res, next) => {
    try {
        const propertyArticle = await PropertyArticleRepository.getEditArticle(req.params.slug);
        propertyArticle.hashid = hashidsHelper.encode(propertyArticle._id.toString());

        return res.render('modules/propertyArticles/client/map', {
            propertyArticle,
        });
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    list,
    search,
    show,
    showMyArticles,
    create,
    store,
    edit,
    update,
    listImages,
    showMap,
};
