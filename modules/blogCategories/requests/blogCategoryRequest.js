const { check } = require('express-validator/check');
const getSlug = require('speakingurl');
const BlogCategoryRepositoryClass = require('../repositories/BlogCategoryRepository');

const BlogCategoryRepository = new BlogCategoryRepositoryClass();

const createCategoryRequest = [
    check('name').trim()
        .not().isEmpty().withMessage('Tên không được bỏ trống')
        .custom(async (value) => {
            try {
                const validate = await BlogCategoryRepository.checkExist({ name: value });
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
                const validate = await BlogCategoryRepository.checkExist({ slug: getSlug(value) });
                if (validate) {
                    throw new Error('Đường dẫn đã được sử dụng');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
];

const editCategoryRequest = [
    check('name').trim()
        .not().isEmpty().withMessage('Tên không được bỏ trống')
        .custom(async (value, { req }) => {
            try {
                const validate = await BlogCategoryRepository.checkExistWithTrashed({
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
                const validate = await BlogCategoryRepository.checkExistWithTrashed({
                    _id: { $ne: req.params.id },
                    slug: getSlug(value),
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

module.exports = { createCategoryRequest, editCategoryRequest };
