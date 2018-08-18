const url = require('url');
const s3Config = require('../../config/s3');
const imageHelper = require('../../helpers/imageHelper');
const storageHelper = require('../../helpers/storage/storageHelper');
const dateHelper = require('../../helpers/dateHelper');
const paginationHelper = require('../../helpers/paginationHelper');
const responseHelper = require('../../helpers/responseHelper');

const index = async (req, res, next) => {
    try {
        const { after } = req.query;
        const images = await storageHelper.storage('s3').list(after);
        paginationHelper.setUpS3Url(images, { pageUrl: url.parse(req.originalUrl).pathname });
        images.renderS3Pagination = paginationHelper.renderS3Pagination;

        return res.render('modules/images/admin/list', {
            images,
            endPoint: s3Config[process.env.APP_ENV].end_point,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const create = (req, res) => (res.render('modules/images/admin/upload'));

const store = async (req, res) => {
    try {
        let images = [];
        req.files.forEach((file) => {
            images.push(imageHelper.optimizeImage(file, {
                width: 750,
                quality: 75,
            }));
        });
        images = await Promise.all(images);
        let locations = [];
        images.forEach((image) => {
            locations.push(storageHelper.storage('s3').upload(`articles/details/${index}-${dateHelper.getSlugCurrentTime()}`, image, 'public-read'));
        });
        locations = await Promise.all(locations);
        return res.json(responseHelper.success(locations));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { images } = req.body;
    try {
        await storageHelper.storage('s3').destroy(images);
        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    create,
    store,
    destroy,
};
