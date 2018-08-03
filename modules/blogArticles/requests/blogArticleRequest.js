const { check } = require('express-validator/check');
const getSlug = require('speakingurl');
const BlogArticleRepositoryClass = require('../repositories/BlogArticleRepository');
const dateHelper = require('../../../helpers/dateHelper');

const BlogArticleRepository = new BlogArticleRepositoryClass();

const createArticleRequest = [
    check('title')
        .not().isEmpty().withMessage('Tiêu đề không được bỏ trống')
        .custom(async (value, { req }) => {
            try {
                const currentTime = dateHelper.getSlugCurrentTime();
                const article = await BlogArticleRepository.checkExistWithTrashed({
                    slug: `${getSlug(value)}-${currentTime}`,
                });
                if (article) {
                    throw new Error('Tiêu đề đã được sử dụng');
                }
                req.attributes = {
                    createdTime: currentTime,
                };
                return true;
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('category').not().isEmpty().withMessage('Thể loại không được bỏ trống'),
    check('image').custom((value, { req }) => (req.file || req.body.video)).withMessage('Ảnh hoặc video không được bỏ trống'),
    check('video').custom((value, { req }) => (value || req.file)).withMessage('Ảnh hoặc video không được bỏ trống'),
    check('useVideo').custom((value, { req }) => {
        try {
            if (value && !req.body.video) {
                throw new Error('Video không được bỏ trống');
            }
            return true;
        } catch (e) {
            return Promise.reject(e.message);
        }
    }),
    check('content').not().isEmpty().withMessage('Nội dung không được bỏ trống'),
    check('slug')
        .custom(async (value, { req }) => {
            if (!value) {
                return true;
            }
            try {
                const currentTime = dateHelper.getSlugCurrentTime();
                const article = await BlogArticleRepository.checkExistWithTrashed({
                    slug: `${getSlug(value)}-${currentTime}`,
                });
                if (article) {
                    throw new Error('Tiêu đề đã được sử dụng');
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

module.exports = { createArticleRequest };
