const { check } = require('express-validator/check');
const getSlug = require('speakingurl');

const BlogCategoryRepository = new (require('../repositories/blogCategoryRepository'))();

const createCategoryRequest = [
    check('name')
        .not().isEmpty().withMessage('Tên không được bỏ trống')
        .custom(async value => {
            const check = await BlogCategoryRepository.checkExist({ name: value });
            if (check) {
                return Promise.reject('Tên đã được sử dụng');
            }
        }),
    check('slug')
        .custom(async value => {
            const check = await BlogCategoryRepository.checkExist({ slug: getSlug(value) });
            if (check) {
                return Promise.reject('Đường dẫn đã được sử dụng');
            }
        })
];

const editCategoryRequest = [
    check('name')
        .not().isEmpty().withMessage('Tên không được bỏ trống')
        .custom(async (value, { req }) => {
            const check = await BlogCategoryRepository.checkExist({ _id: { $ne: req.params.id }, name: value });
            if (check) {
                return Promise.reject('Tên đã được sử dụng');
            }
        }),
    check('slug')
        .custom(async (value, { req }) => {
            const check = await BlogCategoryRepository.checkExist({
                _id: { $ne: req.params.id },
                slug: getSlug(value)
            });
            if (check) {
                return Promise.reject('Đường dẫn đã được sử dụng');
            }
        })
];

module.exports = { createCategoryRequest, editCategoryRequest };