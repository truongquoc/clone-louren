const { check } = require('express-validator/check');
const getSlug = require('speakingurl');
const dateHelper = require('../../../helpers/dateHelper');
const adminHelper = require('../../../helpers/adminHelper');
const PropertyArticleRepositoryClass = require('../repositories/PropertyArticleRepository');
const DistrictRepositoryClass = require('../../districts/repositories/DistrictRepository');

const PropertyArticleRepository = new PropertyArticleRepositoryClass();
const DistrictRepository = new DistrictRepositoryClass();

const createArticleRequest = [
    check('title').trim()
        .not().isEmpty().withMessage('Tiêu đề không được bỏ trống')
        .custom(async (value, { req }) => {
            try {
                const currentTime = dateHelper.getSlugCurrentTime();
                const article = await PropertyArticleRepository.checkExistWithTrashed({
                    slug: `${getSlug(value)}-${currentTime}`,
                });
                if (article) {
                    throw new Error('Tiêu đề đã được sử dụng');
                }
                req.attributes = {
                    createdTime: currentTime,
                };
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('image').custom((value, { req }) => (req.file)).withMessage('Ảnh không được bỏ trống'),
    check('video').trim()
        .custom(value => (value ? adminHelper.validateYouTubeUrl(value) : true)).withMessage('Video không đúng định dạng Youtube'),
    check('description').trim()
        .not().isEmpty().withMessage('Mô tả không được bỏ trống')
        .custom(value => (value.replace(/<\/?[^>]+(>|$)/g, '').trim()))
        .withMessage('Mô tả không được bỏ trống'),
    check('category')
        .not().isEmpty().withMessage('Loại hình không được bỏ trống')
        .not().isIn([0]).withMessage('Loại hình không được bỏ trống'),
    check('type')
        .not().isEmpty().withMessage('Hình thức kinh doanh không được bỏ trống')
        .not().isIn([0]).withMessage('Hình thức kinh doanh không được bỏ trống'),
    check('status')
        .not().isEmpty().withMessage('Trạng thái không được bỏ trống')
        .not().isIn([0]).withMessage('Trạng thái không được bỏ trống'),
    check('city')
        .not().isEmpty().withMessage('Tỉnh / thành phố không được bỏ trống')
        .not().isIn([0]).withMessage('Tỉnh / thành phố không được bỏ trống'),
    check('district')
        .not().isEmpty().withMessage('Quận / huyện không được bỏ trống')
        .not().isIn([0]).withMessage('Quận / huyện không được bỏ trống')
        .custom(async (value, { req }) => {
            try {
                const validate = await DistrictRepository.getDetail({ _id: value }, { select: 'city' });
                if (validate.city.toString() !== req.body.city) {
                    throw new Error('Quận / huyện không hợp lệ');
                }
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('address').trim()
        .not().isEmpty().withMessage('Địa chỉ không được bỏ trống'),
    check('area').trim()
        .custom((value) => {
            if (value) {
                value = parseInt(value, 10);
                return value > 0;
            }
            return true;
        }).withMessage('Diện tích không hợp lệ'),
    check('price[value]').trim()
        .custom((value) => {
            if (value) {
                value = parseInt(value, 10);
                return value > 0;
            }
            return true;
        }).withMessage('Giá không hợp lệ'),
    check('price[type]').custom((value, { req }) => (req.body.price ? value : true)).withMessage('Loại giá không hợp lệ'),
    check('conditions').custom((conditions) => {
        return true;
    }),
    check('slug').trim()
        .custom(async (value, { req }) => {
            if (!value) {
                return true;
            }
            try {
                const currentTime = dateHelper.getSlugCurrentTime();
                const article = await PropertyArticleRepository.checkExistWithTrashed({
                    slug: `${getSlug(value)}-${currentTime}`,
                });
                if (article) {
                    throw new Error('Tiêu đề đã được sử dụng');
                }
                req.attributes = {
                    createdTime: currentTime,
                };
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
];

const editArticleRequest = [
    check('title').trim()
        .not().isEmpty().withMessage('Tiêu đề không được bỏ trống')
        .custom(async (value, { req }) => {
            try {
                const oldArticle = await PropertyArticleRepository.getDetail({ _id: req.params.id }, { select: '-_id slug' });
                const createdTime = dateHelper.getTimeInSlug(oldArticle.slug);
                const article = await PropertyArticleRepository.checkExistWithTrashed({
                    _id: { $ne: req.params.id },
                    slug: `${getSlug(value)}-${createdTime}`,
                });
                if (article) {
                    throw new Error('Tiêu đề đã được sử dụng');
                }
                req.attributes = { createdTime };
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('image').custom((value, { req }) => {
        if (!req.body.imageUrl && !req.file) {
            return req.file;
        }
        return true;
    }).withMessage('Ảnh hoặc video không được bỏ trống'),
    check('video').trim()
        .custom(value => (value ? adminHelper.validateYouTubeUrl(value) : true)).withMessage('Video không đúng định dạng Youtube'),
    check('description').trim()
        .not().isEmpty().withMessage('Mô tả không được bỏ trống')
        .custom(value => (value.replace(/<\/?[^>]+(>|$)/g, '').trim()))
        .withMessage('Mô tả không được bỏ trống'),
    check('category')
        .not().isEmpty().withMessage('Loại hình không được bỏ trống')
        .not().isIn([0]).withMessage('Loại hình không được bỏ trống'),
    check('type')
        .not().isEmpty().withMessage('Hình thức kinh doanh không được bỏ trống')
        .not().isIn([0]).withMessage('Hình thức kinh doanh không được bỏ trống'),
    check('status')
        .not().isEmpty().withMessage('Trạng thái không được bỏ trống')
        .not().isIn([0]).withMessage('Trạng thái không được bỏ trống'),
    check('city')
        .not().isEmpty().withMessage('Tỉnh / thành phố không được bỏ trống')
        .not().isIn([0]).withMessage('Tỉnh / thành phố không được bỏ trống'),
    check('district')
        .not().isEmpty().withMessage('Quận / huyện không được bỏ trống')
        .not().isIn([0]).withMessage('Quận / huyện không được bỏ trống')
        .custom(async (value, { req }) => {
            try {
                const validate = await DistrictRepository.getDetail({ _id: value }, { select: 'city' });
                if (validate.city.toString() !== req.body.city) {
                    throw new Error('Quận / huyện không hợp lệ');
                }
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('address').trim()
        .not().isEmpty().withMessage('Địa chỉ không được bỏ trống'),
    check('area').trim()
        .custom((value) => {
            if (value) {
                value = parseInt(value, 10);
                return value > 0;
            }
            return true;
        }).withMessage('Diện tích không hợp lệ'),
    check('price[value]').trim()
        .custom((value) => {
            if (value) {
                value = parseInt(value, 10);
                return value > 0;
            }
            return true;
        }).withMessage('Giá không hợp lệ'),
    check('price[type]').custom((value, { req }) => (req.body.price ? value : true)).withMessage('Loại giá không hợp lệ'),
    check('conditions').custom((conditions) => {
        return true;
    }),
    check('slug').trim()
        .custom(async (value, { req }) => {
            if (!value) {
                return true;
            }
            try {
                const oldArticle = await PropertyArticleRepository.getDetail({ _id: req.params.id }, { select: '-_id slug' });
                const createdTime = dateHelper.getTimeInSlug(oldArticle.slug);
                const article = await PropertyArticleRepository.checkExistWithTrashed({
                    _id: { $ne: req.params.id },
                    slug: `${getSlug(value)}-${createdTime}`,
                });
                if (article) {
                    throw new Error('Tiêu đề đã được sử dụng');
                }
                req.attributes = { createdTime };
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
];

const storeImagesRequest = [
    check('images').not().isEmpty().withMessage('Ảnh không được bỏ trống'),
    check('type').isIn(['1', '2']).withMessage('Cách lưu trữ không hợp lệ'),
];

module.exports = { createArticleRequest, editArticleRequest, storeImagesRequest };
