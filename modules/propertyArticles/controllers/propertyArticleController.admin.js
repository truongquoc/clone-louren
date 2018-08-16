const { validationResult } = require('express-validator/check');
const url = require('url');
const getSlug = require('speakingurl');
const responseHelper = require('../../../helpers/responseHelper');
const imageHelper = require('../../../helpers/imageHelper');
const storageHelper = require('../../../helpers/storage/storageHelper');
const dateHelper = require('../../../helpers/dateHelper');
const paginationHelper = require('../../../helpers/paginationHelper');
const PropertyArticleRepositoryClass = require('../repositories/PropertyArticleRepository');
const PropertyAmenityRepositoryClass = require('../../propertyAmenities/repositories/PropertyAmenityRepository');
const PropertyCategoryRepositoryClass = require('../../propertyCategories/repositories/PropertyCategoryRepository');
const PropertyConditionRepositoryClass = require('../../propertyConditions/repositories/PropertyConditionRepository');
const PropertyTypeRepositoryClass = require('../../propertyTypes/repositories/PropertyTypeRepository');
const PropertyStatusRepositoryClass = require('../../propertyStatuses/repositories/PropertyStatusRepository');
const CityRepositoryClass = require('../../cities/repositories/CityRepository');
const DistrictRepositoryClass = require('../../districts/repositories/DistrictRepository');
const PriceTypeRepositoryClass = require('../../priceTypes/repositories/PriceTypeRepository');

const PropertyArticleRepository = new PropertyArticleRepositoryClass();
const PropertyAmenityRepository = new PropertyAmenityRepositoryClass();
const PropertyCategoryRepository = new PropertyCategoryRepositoryClass();
const PropertyConditionRepository = new PropertyConditionRepositoryClass();
const PropertyTypeRepository = new PropertyTypeRepositoryClass();
const PropertyStatusRepository = new PropertyStatusRepositoryClass();
const CityRepository = new CityRepositoryClass();
const DistrictRepository = new DistrictRepositoryClass();
const PriceTypeRepository = new PriceTypeRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const propertyArticles = await PropertyArticleRepository.adminList(undefined, {
            query,
            pageUrl: req.baseUrl,
        });
        propertyArticles.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/propertyArticles/admin/list', {
            propertyArticles, query,
        });
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

const showMyArticles = async (req, res, next) => {
    try {
        const { query } = req;
        const propertyArticles = await PropertyArticleRepository.adminList(req.session.cUser._id, {
            query,
            pageUrl: url.parse(req.originalUrl).pathname,
        });
        propertyArticles.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/propertyArticles/admin/me', {
            propertyArticles, query,
        });
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

const create = async (req, res, next) => {
    try {
        const [
            propertyAmenities,
            propertyConditions,
            propertyCategories,
            propertyTypes,
            propertyStatuses,
            cities,
            districts,
            priceTypes,
        ] = await Promise.all([
            PropertyAmenityRepository.baseGet(),
            PropertyConditionRepository.baseGet(),
            PropertyCategoryRepository.baseGet(),
            PropertyTypeRepository.baseGet(),
            PropertyStatusRepository.baseGet(),
            CityRepository.baseGet(),
            DistrictRepository.baseGet(),
            PriceTypeRepository.baseGet(),
        ]);

        return res.render('modules/propertyArticles/admin/create', {
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
        return res.redirect(`/admin/property/articles/edit/${article.slug}`);
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const edit = async (req, res, next) => {
    const { slug } = req.params;
    try {
        const [
            propertyArticle,
            propertyAmenities,
            propertyConditions,
            propertyCategories,
            propertyTypes,
            propertyStatuses,
            cities,
            districts,
            priceTypes,
        ] = await Promise.all([
            PropertyArticleRepository.getEditArticle(slug),
            PropertyAmenityRepository.baseGet(),
            PropertyConditionRepository.baseGet(),
            PropertyCategoryRepository.baseGet(),
            PropertyTypeRepository.baseGet(),
            PropertyStatusRepository.baseGet(),
            CityRepository.baseGet(),
            DistrictRepository.baseGet(),
            PriceTypeRepository.baseGet(),
        ]);

        return res.render('modules/propertyArticles/admin/edit', {
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
        return res.redirect(`/admin/property/articles/edit/${getSlug(`${data.title || data.slug}-${data.createdTime}`)}`);
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const approve = async (req, res) => {
    try {
        const article = await PropertyArticleRepository.approve(req.params.id);

        return res.json(responseHelper.success(article));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
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
    index, showMyArticles, create, store, edit, update, approve, destroy,
};
