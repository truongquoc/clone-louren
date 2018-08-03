const { check } = require('express-validator/check');
const getSlug = require('speakingurl');
const BlogTagRepositoryClass = require('../repositories/BlogTagRepository');

const BlogTagRepository = new BlogTagRepositoryClass();

const createTagRequest = [
    check('name')
        .not().isEmpty().withMessage('Tên không được bỏ trống.')
        .custom(async (value) => {
            try {
                const validate = await BlogTagRepository.checkExist({ name: value });
                if (validate) {
                    throw new Error('Tên đã được sử dụng');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('slug')
        .custom(async (value) => {
            try {
                const validate = await BlogTagRepository.checkExist({ slug: getSlug(value) });
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
        .not().isEmpty().withMessage('Tên không được bỏ trống.')
        .custom(async (value, { req }) => {
            try {
                const validate = await BlogTagRepository.checkExist({
                    _id: { $ne: req.params.id },
                    name: value,
                });
                if (validate) {
                    throw new Error('Tên đã được sử dụng');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('slug')
        .custom(async (value, { req }) => {
            try {
                const validate = await BlogTagRepository.checkExist({
                    _id: { $ne: req.params.id },
                    slug: value,
                });
                if (validate) {
                    throw new Error('Đường dẫn đã được sử dụng');
                }
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
];

module.exports = { createTagRequest, editTagRequest };
