const { check } = require('express-validator/check');
const getSlug = require('speakingurl');
const ProductTypeRepositoryClass = require('../repositories/ProductTypeRepository');

const ProductTypeRepository = new ProductTypeRepositoryClass();

const createTagRequest = [
    check('name').trim()
        .not().isEmpty().withMessage('Tên không được bỏ trống.')
        .custom(async (value) => {
            try {
                const validate = await ProductTypeRepository.checkExist({ name: value });
                if (validate) {
                    throw new Error('Tên đã được sử dụng');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('parentType')
        .custom(async (value, { req }) => {
            try {
                if (value && value !== '0') {
                    if (value === req.params.id) {
                        throw new Error('Thể loại không hợp lệ');
                    }
                    const validate = await ProductTypeRepository.checkExist({ _id: value });
                    if (!validate) {
                        throw new Error('Thể loại không hợp lệ');
                    }
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('nameEn').trim()
        .not().isEmpty().withMessage('Tên không được bỏ trống')
        .custom(async (value) => {
            try {
                const validate = await ProductTypeRepository.checkExist({ 'names.en': value });
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
                const validate = await ProductTypeRepository.checkExist({ slug: getSlug(value) });
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
                const validate = await ProductTypeRepository.checkExistWithTrashed({
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
    check('parentType')
        .custom(async (value, { req }) => {
            try {
                if (value && value !== '0') {
                    if (value === req.params.id) {
                        throw new Error('Thể loại không hợp lệ');
                    }
                    const validate = await ProductTypeRepository.checkExist({ _id: value });
                    if (!validate) {
                        throw new Error('Thể loại không hợp lệ');
                    }
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('nameEn').trim()
        .not().isEmpty().withMessage('Tên không được bỏ trống')
        .custom(async (value, { req }) => {
            try {
                const validate = await ProductTypeRepository.checkExistWithTrashed({
                    _id: { $ne: req.params.id },
                    'names.en': value,
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
                const validate = await ProductTypeRepository.checkExistWithTrashed({
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
