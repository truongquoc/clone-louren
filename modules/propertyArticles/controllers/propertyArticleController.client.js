const { validationResult } = require('express-validator/check');
const url = require('url');
const getSlug = require('speakingurl');
const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');
const hashidsHelper = require('../../../helpers/hashidsHelper');
const imageHelper = require('../../../helpers/imageHelper');
const dateHelper = require('../../../helpers/dateHelper');
const storageHelper = require('../../../helpers/storage/storageHelper');
const roleHelper = require('../../../helpers/roleHelper');
const { getSearchData } = require('../../../infrastructure/controllers/baseController.client');
const { clientGetCreateData } = require('../../../infrastructure/controllers/baseController.admin');
const PropertyCategoryRepositoryClass = require('../../propertyCategories/repositories/PropertyCategoryRepository');
const PropertyStatusRepositoryClass = require('../../propertyStatuses/repositories/PropertyStatusRepository');
const PropertyTypeRepositoryClass = require('../../propertyTypes/repositories/PropertyTypeRepository');
const CityRepositoryClass = require('../../cities/repositories/CityRepository');
const DistrictRepositoryClass = require('../../districts/repositories/DistrictRepository');
const BlogArticleRepositoryClass = require('../../blogArticles/repositories/BlogArticleRepository');
const UploadRepositoryClass = require('../../../infrastructure/repositories/UploadRepository');
const PropertyArticleRepositoryClass = require('../repositories/PropertyArticleRepository');
const UserRepositoryClass = require('../../users/repositories/UserRepository');

const PropertyCategoryRepository = new PropertyCategoryRepositoryClass();
const PropertyStatusRepository = new PropertyStatusRepositoryClass();
const PropertyTypeRepository = new PropertyTypeRepositoryClass();
const CityRepository = new CityRepositoryClass();
const DistrictRepository = new DistrictRepositoryClass();
const BlogArticleRepository = new BlogArticleRepositoryClass();
const UploadRepository = new UploadRepositoryClass();
const PropertyArticleRepository = new PropertyArticleRepositoryClass();
const UserRepository = new UserRepositoryClass();

const getHomeSearchData = () => [
    PropertyStatusRepository.baseGet(),
    PropertyTypeRepository.baseGet(),
    CityRepository.baseGet(),
    DistrictRepository.baseGet(),
];

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

const show = async (req, res, next) => {
    const { query } = req;
    try {
        const data = await getSearchData();
        data.push(PropertyArticleRepository.show(req.params.slug));
        const [
            propertyTypes,
            cities,
            districts,
            propertyAmenities,
            propertyConditions,
            propertyArticle,
        ] = await Promise.all(data);

        return res.render('modules/propertyArticles/client/detail', {
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
            propertyAmenities,
            propertyConditions,
            propertyTypes,
            cities,
            districts,
            priceTypes,
        ] = await Promise.all(clientGetCreateData());

        return res.render('modules/propertyArticles/client/create', {
            propertyAmenities,
            propertyConditions,
            propertyTypes,
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
        if (roleHelper.hasRoleOnly(req.session.cUser, 'User')) {
            await UserRepository.incrementArticleQuantity(req.session.cUser._id);
        }
        return res.redirect(`/nguoi-dung/bai-viet-bat-dong-san/${article.slug}`);
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const edit = async (req, res, next) => {
    try {
        const data = clientGetCreateData();
        data.push(PropertyArticleRepository.getEditArticle(req.params.slug));
        const [
            propertyAmenities,
            propertyConditions,
            propertyTypes,
            cities,
            districts,
            priceTypes,
            propertyArticle,
        ] = await Promise.all(data);

        return res.render('modules/propertyArticles/client/edit', {
            propertyArticle,
            propertyAmenities,
            propertyConditions,
            propertyTypes,
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
    show,
    showMyArticles,
    create,
    store,
    edit,
    update,
    listImages,
    showMap,
};
