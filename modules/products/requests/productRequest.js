const { check } = require('express-validator/check');
const getSlug = require('speakingurl');
const commonConstant = require('../../../constants/commonConstant');
const ProductRepositoryClass = require('../repositories/productRepository');
const dateHelper = require('../../../helpers/dateHelper');
const adminHelper = require('../../../helpers/adminHelper');

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
.isIn([0])
.withMessage('Thể loại không được bỏ trống'),
    check('info').trim().not().isEmpty()
.withMessage('Thông tin không được bỏ trống'),
    check('detail').trim()
        .not().isEmpty()
.withMessage('Nội dung không được bỏ trống')
        .custom(value => value.replace(/<\/?[^>]+(>|$)/g, '').trim())
        .withMessage('Nội dung không được bỏ trống'),
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
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('type')
        .not().isEmpty().withMessage('Thể loại không được bỏ trống')
        .not()
.isIn([0])
.withMessage('Thể loại không được bỏ trống'),
    check('info').trim()
        .not().isEmpty()
.withMessage('Thông tin không được bỏ trống'),
    check('detail').trim()
        .not().isEmpty()
.withMessage('Nội dung không được bỏ trống')
        .custom(value => value.replace(/<\/?[^>]+(>|$)/g, '').trim())
        .withMessage('Nội dung không được bỏ trống'),
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
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
];

module.exports = { createProductRequest, editProductRequest };
