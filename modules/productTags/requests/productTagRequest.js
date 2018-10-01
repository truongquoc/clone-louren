const { check } = require('express-validator/check');
const getSlug = require('speakingurl');
const ProductTagRepositoryClass = require('../repositories/ProductTagRepository');

const ProductTagRepository = new ProductTagRepositoryClass();

const createTagRequest = [
    check('name').trim()
        .not().isEmpty().withMessage('Tên không được bỏ trống.')
        .custom(async (value) => {
            try {
                const validate = await ProductTagRepository.checkExist({ name: value });
                if (validate) {
                    throw new Error('Tên đã được sử dụng');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('slug').trim()
        .custom(async (value) => {
            try {
                const validate = await ProductTagRepository.checkExist({ slug: getSlug(value) });
                if (validate) {
                    throw new Error('Đường dẫn đã được sử dụng');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
];

const editTagRequest = [
    check('name')
        .trim()
        .not().isEmpty().withMessage('Tên không được bỏ trống.')
        .custom(async (value, { req }) => {
            try {
                const validate = await ProductTagRepository.checkExistWithTrashed({
                    _id: { $ne: req.params.id },
                    name: value,
                });
                if (validate) {
                    throw new Error('Tên đã được sử dụng hoặc bị xóa');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('slug').trim()
        .custom(async (value, { req }) => {
            try {
                const validate = await ProductTagRepository.checkExistWithTrashed({
                    _id: { $ne: req.params.id },
                    slug: value,
                });
                if (validate) {
                    throw new Error('Đường dẫn đã được sử dụng hoặc bị xóa');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
];

module.exports = { createTagRequest, editTagRequest };
