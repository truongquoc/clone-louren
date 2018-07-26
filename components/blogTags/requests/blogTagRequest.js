const { check } = require('express-validator/check');
const getSlug = require('speakingurl');

const BlogTag = require('../models/blogTag');

const createTagRequest = [
    check('name')
        .not().isEmpty().withMessage('Tên không được bỏ trống.')
        .custom( value => {
            return BlogTag.findOne({ name: value, deletedAt: null }).then(tag => {
                if (tag) {
                    return Promise.reject('Tag đã được sử dụng');
                }
            });
        }),
    check('slug')
        .not().isEmpty().withMessage('Đường dẫn không được bỏ trống.')
        .custom( value => {
            return BlogTag.findOne({ slug: value, deletedAt: null }).then(tag => {
                if (tag) {
                    return Promise.reject('Đường dẫn đã được sử dụng');
                }
            });
        }),
];

const editTagRequest = [
    check('name')
        .not().isEmpty().withMessage('Tên không được bỏ trống.') 
        .custom((value, { req }) => {
            return BlogTag.findOne({ _id: { $name: req.params.id }, name: value,  deletedAt: null }).then(tag => {
                if (tag) {
                    return Promise.reject('Tag đã được sử dụng');
                }
            });
        }),
    check('slug')
        .not().isEmpty().withMessage('Đường dẫn không được bỏ trống.')
        .custom((value, { req }) => {
            return BlogTag.findOne({ _id: { $name: req.params.id }, slug: getSlug(value), deletedAt: null }).then(tag => {
                if (tag) {
                    return Promise.reject('Đường dẫn đã được sử dụng');
                }
            });
        }),
];

module.exports = { createTagRequest, editTagRequest };