const url = require('url');
const { validationResult } = require('express-validator/check');
const imageHelper = require('../../../helpers/imageHelper');
const storageHelper = require('../../../helpers/storage/storageHelper');
const dateHelper = require('../../../helpers/dateHelper');
const paginationHelper = require('../../../helpers/paginationHelper');
const responseHelper = require('../../../helpers/responseHelper');
const UploadRepositoryClass = require('../repositories/UploadRepository');

const UploadRepository = new UploadRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { after } = req.query;
        const images = await storageHelper.storage('s3').list(after);
        paginationHelper.setUpS3Url(images, { pageUrl: url.parse(req.originalUrl).pathname });
        images.renderS3Pagination = paginationHelper.renderS3Pagination;

        return res.render('modules/uploads/admin/index', {
            images,
            endPoint: process.env.AWS_END_POINT,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const list = async (req, res, next) => {
    const { query } = req;
    try {
        const images = await UploadRepository.list(undefined, {
            query,
            pageUrl: req.baseUrl,
        });
        images.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/uploads/admin/list', {
            images,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const showMyUploads = async (req, res) => {
    const { query } = req;
    try {
        const images = await UploadRepository.list(req.session.cUser._id, {
            query,
            pageUrl: req.baseUrl,
        });
        images.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/uploads/admin/me', {
            images,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const create = (req, res) => res.render('modules/uploads/admin/upload');

const store = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        imageHelper.deleteImage(req.files, false);
        return res.json(responseHelper.error(errors.mapped().images.msg, 400));
    }
    const userId = req.session.cUser._id;
    try {
        let images = [];
        req.files.forEach((file) => {
            images.push(imageHelper.optimizeImage(file, { width: 750, quality: 75 }));
        });
        images = await Promise.all(images);
        let locations = [];
        images.forEach((image, i) => {
            locations.push(storageHelper.storage('s3').upload(`articles/details/${i}-${dateHelper.getSlugCurrentTime()}`, image, 'public-read'));
        });
        locations = await Promise.all(locations);
        await UploadRepository.create(locations, userId);
        return res.json(responseHelper.success(locations));
    } catch (e) {
        imageHelper.deleteImage(req.files, false);
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { images } = req.body;
    try {
        const data = await UploadRepository.getManyByIds(images);
        const imagesData = data.map(image => image.url);
        await Promise.all([
            storageHelper.storage('s3').destroy(imagesData),
            UploadRepository.delete(images),
        ]);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};
const destroyByUrl = async (req, res) => {
    const { images } = req.body;
    try {
        await Promise.all([
            storageHelper.storage('s3').destroy(images),
            UploadRepository.deleteByUrl(images),
        ]);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    list,
    showMyUploads,
    create,
    store,
    destroy,
    destroyByUrl,
};
