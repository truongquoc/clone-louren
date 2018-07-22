const { check } = require('express-validator/check');
const getSlug = require('speakingurl');

const BlogCategory = require('../models/blogCategory');

const createCategoryRequest = [
    check('name')
        .not().isEmpty().withMessage('Name is required')
        .custom(value => {
            return BlogCategory.findOne({ name: value, deletedAt: null }).then(category => {
                if (category) {
                    return Promise.reject('Category name already in use');
                }
            });
        }),
    check('slug')
        .custom(value => {
            return BlogCategory.findOne({ slug: value, deletedAt: null }).then(category => {
                if (category) {
                    return Promise.reject('Category slug already in use');
                }
            });
        })
];

const editCategoryRequest = [
    check('name')
        .not().isEmpty().withMessage('Tên không được bỏ trống')
        .custom((value, { req }) => {
            return BlogCategory.findOne({ _id: { $ne: req.params.id }, name: value, deletedAt: null }).then(category => {
                if (category) {
                    return Promise.reject('Tên đã được sử dụng');
                }
            });
        }),
    check('slug')
        .custom((value, { req }) => {
            return BlogCategory.findOne({ _id: { $ne: req.params.id }, slug: getSlug(value), deletedAt: null })
                .then(category => {
                    if (category) {
                        return Promise.reject('Đường dẫn đã được sử dụng');
                    }
                }
            );
        })
];

module.exports = { createCategoryRequest, editCategoryRequest };