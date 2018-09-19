const { check } = require('express-validator/check');
const getSlug = require('speakingurl');
const commonConstant = require('../../../constants/commonConstant');
const ProductRepositoryClass = require('../repositories/ProductRepository');
const dateHelper = require('../../../helpers/dateHelper');

const ProductRepository = new ProductRepositoryClass();

const createProductRequest = [
    check('name').trim()
        .not().isEmpty()
        .withMessage('Tên sản phẩm không được bỏ trống')
        .custom(async (value, { req }) => {
            try {
                const currentTime = dateHelper.getSlugCurrentTime();
                const product = await ProductRepository.checkExistWithTrashed({
                    slug: `${getSlug(value)}-${currentTime}`,
                });
                if (product) {
                    throw new Error('Tên sản phẩm đã được sử dụng');
                }
                req.attributes = {
                    createdTime: currentTime,
                };
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('type')
        .not().isEmpty().withMessage('Thể loại không được bỏ trống')
        .not()
        .isIn(['0'])
        .withMessage('Thể loại không được bỏ trống'),
    check('quantity')
        .not()
        .isEmpty()
        .withMessage('Số lượng không được bỏ trống'),
    check('priceValue')
        .not()
        .isEmpty()
        .withMessage('Giá tiền không được bỏ trống'),
    check('sku')
        .not()
        .isEmpty()
        .withMessage('Mã SKU không được bỏ trống')
        .custom(async (value) => {
            try {
                const product = await ProductRepository.checkExistWithTrashed({ code: value });
                if (product) {
                    throw new Error('Mã sản phẩm đã được sử dụng');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('image').custom((value, { req }) => {
        try {
            if (req.file) {
                if (commonConstant.imageTypes.indexOf(req.file.mimetype) < 0) {
                    throw new Error('Loại ảnh không hợp lệ');
                } else if (req.file.size > commonConstant.imageMaxsize) {
                    throw new Error('Kích thước ảnh quá lớn');
                }
            }
            if (!req.file && !(req.body.video && req.body.useVideo)) {
                throw new Error('Ảnh hoặc video không được bỏ trống');
            }
            return true;
        } catch (e) {
            return Promise.reject(e.message);
        }
    }),
    check('slug').trim()
        .custom(async (value, { req }) => {
        if (!value) {
            return true;
        }
        try {
            const currentTime = dateHelper.getSlugCurrentTime();
            const product = await ProductRepository.checkExistWithTrashed({
                slug: `${getSlug(value)}-${currentTime}`,
            });
            if (product) {
                throw new Error('Tên sản phẩm đã được sử dụng');
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

const editProductRequest = [
    check('name').trim()
        .not().isEmpty()
        .withMessage('Tên sản phẩm không được bỏ trống')
        .custom(async (value, { req }) => {
            try {
                const oldProduct = await ProductRepository.getDetail({ _id: req.params.id }, { select: '-_id slug' });
                const createdTime = dateHelper.getTimeInSlug(oldProduct.slug);
                const product = await ProductRepository.checkExistWithTrashed({
                    _id: { $ne: req.params.id },
                    slug: `${getSlug(value)}-${createdTime}`,
                });
                if (product) {
                    throw new Error('Tên sản phẩm đã được sử dụng');
                }
                req.attributes = { createdTime };
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('type')
        .not().isEmpty().withMessage('Thể loại không được bỏ trống')
        .not()
        .isIn(['0'])
        .withMessage('Thể loại không được bỏ trống'),
    check('quantity')
        .not()
        .isEmpty()
        .withMessage('Số lượng không được bỏ trống'),
    check('priceValue')
        .not()
        .isEmpty()
        .withMessage('Giá tiền không được bỏ trống'),
    check('image').custom((value, { req }) => {
        try {
            if (req.file) {
                if (commonConstant.imageTypes.indexOf(req.file.mimetype) < 0) {
                    throw new Error('Loại ảnh không hợp lệ');
                } else if (req.file.size > commonConstant.imageMaxsize) {
                    throw new Error('Kích thước ảnh quá lớn');
                }
            }
            if (!req.body.imageUrl && !(req.body.video && req.body.useVideo) && !req.file) {
                throw new Error('Ảnh hoặc video không được bỏ trống');
            }
            return true;
        } catch (e) {
            return Promise.reject(e.message);
        }
    }),
    check('sku')
        .not()
        .isEmpty()
        .withMessage('Mã SKU không được bỏ trống')
        .custom(async (value, { req }) => {
            try {
                const product = await ProductRepository.checkExistWithTrashed({
                    _id: { $ne: req.params.id },
                    code: value,
                });
                if (product) {
                    throw new Error('Mã sản phẩm đã được sử dụng');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('slug').trim()
        .custom(async (value, { req }) => {
            if (!value) {
                return true;
            }
            try {
                const oldProduct = await ProductRepository.getDetail({ _id: req.params.id }, { select: '-_id slug' });
                const createdTime = dateHelper.getTimeInSlug(oldProduct.slug);
                const product = await ProductRepository.checkExistWithTrashed({
                    _id: { $ne: req.params.id },
                    slug: `${getSlug(value)}-${createdTime}`,
                });
                if (product) {
                    throw new Error('Tên sản phẩm đã được sử dụng');
                }
                req.attributes = { createdTime };
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
];

const storeImagesRequest = [
    check('images').not().isEmpty().withMessage('Ảnh không được bỏ trống'),
    check('type').isIn(['1', '2']).withMessage('Cách lưu trữ không hợp lệ'),
];

module.exports = {
    createProductRequest,
    editProductRequest,
    storeImagesRequest,
};