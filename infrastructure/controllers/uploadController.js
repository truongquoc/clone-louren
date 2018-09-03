const url = require('url');
const s3Config = require('../../config/s3');
const imageHelper = require('../../helpers/imageHelper');
const storageHelper = require('../../helpers/storage/storageHelper');
const dateHelper = require('../../helpers/dateHelper');
const paginationHelper = require('../../helpers/paginationHelper');
const responseHelper = require('../../helpers/responseHelper');
const UserRepositoryClass = require('../../modules/users/repositories/UserRepository');
const UploadRepositoryClass = require('../repositories/UploadRepository');

const UserRepository = new UserRepositoryClass();
const UploadRepository = new UploadRepositoryClass();

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
    const userId = req.session.cUser._id;
    try {
        let images = [];
        await UserRepository.addImagesQuantity(req.files.length, userId);
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
        await storageHelper.storage('s3').destroy(images);
        await UploadRepository.delete(images);
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
