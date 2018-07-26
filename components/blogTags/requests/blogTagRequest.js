const { check } = require('express-validator/check');
const getSlug = require('speakingurl');

const BlogTagRepository = new (require('../repositories/blogTagRepositotiy'));

const createTagRequest = [
    check('name')
        .not().isEmpty().withMessage('Tên không được bỏ trống.')
        .custom(async value => {
            try {
                const check =  await BlogTagRepository.checkExist({ name: value });
                if (check) {
                    return Promise.reject('Tag đã được sử dụng');
                }
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('slug')
        .not().isEmpty().withMessage('Đường dẫn không được bỏ trống.')
        .custom(async value => {
            try {
                const check =  await BlogTagRepository.checkExist({ slug: getSlug(value) });
                if (check) {
                    return Promise.reject('Đường dẫn đã được sử dụng');
                } 
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
];

const editTagRequest = [
    check('name')
        .not().isEmpty().withMessage('Tên không được bỏ trống.') 
        .custom(async (value, { req }) => {
            try {
                const check =  await BlogTagRepository.checkExist({ _id: { $ne: req.params.id }, name: value });
                if (check) {
                    return Promise.reject('Tag đã được sử dụng');
                }
            } catch (e) {
                return Promise.reject(e.message);
            } 
        } 
    ),
    check('slug')
        .not().isEmpty().withMessage('Đường dẫn không được bỏ trống.')
        .custom(async (value, { req }) => {
            try {
                const check =  await BlogTagRepository.checkExist({ _id: { $ne: req.params.id }, slug: value });
                if (check) {
                    return Promise.reject('Đường dẫn đã được sử dụng');
                }
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
];

module.exports = { createTagRequest, editTagRequest };