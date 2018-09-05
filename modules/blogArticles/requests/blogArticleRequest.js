const { check } = require('express-validator/check');
const getSlug = require('speakingurl');
const commonConstant = require('../../../constants/commonConstant');
const BlogArticleRepositoryClass = require('../repositories/BlogArticleRepository');
const dateHelper = require('../../../helpers/dateHelper');
const adminHelper = require('../../../helpers/adminHelper');

const BlogArticleRepository = new BlogArticleRepositoryClass();

const createArticleRequest = [
    check('title').trim()
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
    check('category')
        .not().isEmpty().withMessage('Thể loại không được bỏ trống')
        .not().isIn([0]).withMessage('Thể loại không được bỏ trống'),
    check('description').trim().not().isEmpty().withMessage('Mô tả không được bỏ trống'),
    check('image').custom((value, { req }) => {
        try {
            if (req.file) {
                if (commonConstant.imageTypes.indexOf(req.file.mimetype) < 0) {
                    throw new Error('Loại ảnh không hợp lệ');
                } else if (req.file.size > commonConstant.imageMaxsize) {
                    throw new Error('Kích thước ảnh quá lớn');
                }
            }
            if (!req.file && !(req.body.video && req.body.useVideo)) {
                throw new Error('Ảnh hoặc video không được bỏ trống');
            }
            return true;
        } catch (e) {
            Promise.reject(e.message);
        }
    }),
    check('video').trim()
        .custom((value, { req }) => (value && req.body.useVideo) || req.file).withMessage('Ảnh hoặc video không được bỏ trống')
        .custom(value => (value ? adminHelper.validateYouTubeUrl(value) : true)).withMessage('Video không đúng định dạng Youtube'),
    check('useVideo').custom((value, { req }) => {
        try {
            if ((!value && req.body.video) || (value && !req.body.video)) {
                throw new Error('Video không được sử dụng hoặc bỏ trống');
            }
            return true;
        } catch (e) {
            return Promise.reject(e.message);
        }
    }),
    check('content').trim()
        .not().isEmpty().withMessage('Nội dung không được bỏ trống')
        .custom(value => value.replace(/<\/?[^>]+(>|$)/g, '').trim())
        .withMessage('Nội dung không được bỏ trống'),
    check('slug').trim()
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

const editArticleRequest = [
    check('title').trim()
        .not().isEmpty().withMessage('Tiêu đề không được bỏ trống')
        .custom(async (value, { req }) => {
            try {
                const oldArticle = await BlogArticleRepository.getDetail({ _id: req.params.id }, { select: '-_id slug' });
                const createdTime = dateHelper.getTimeInSlug(oldArticle.slug);
                const article = await BlogArticleRepository.checkExistWithTrashed({
                    _id: { $ne: req.params.id },
                    slug: `${getSlug(value)}-${createdTime}`,
                });
                if (article) {
                    throw new Error('Tiêu đề đã được sử dụng');
                }
                req.attributes = { createdTime };
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
    check('category')
        .not().isEmpty().withMessage('Thể loại không được bỏ trống')
        .not().isIn([0]).withMessage('Thể loại không được bỏ trống'),
    check('description').trim()
        .not().isEmpty().withMessage('Mô tả không được bỏ trống'),
    check('image').custom((value, { req }) => {
        try {
            if (req.file) {
                if (commonConstant.imageTypes.indexOf(req.file.mimetype) < 0) {
                    throw new Error('Loại ảnh không hợp lệ');
                } else if (req.file.size > commonConstant.imageMaxsize) {
                    throw new Error('Kích thước ảnh quá lớn');
                }
            }
            if (!req.body.imageUrl && !(req.body.video && req.body.useVideo) && !req.file) {
                throw new Error('Ảnh hoặc video không được bỏ trống');
            }
            return true;
        } catch (e) {
            return Promise.reject(e.message);
        }
    }),
    check('video').trim()
        .custom((value, { req }) => {
            if (!req.body.imageUrl && !req.file) {
                return req.file || (value && req.body.useVideo);
            }
            return true;
        }).withMessage('Ảnh hoặc video không được bỏ trống')
        .custom(value => (value ? adminHelper.validateYouTubeUrl(value) : true)).withMessage('Video không đúng định dạng Youtube'),
    check('useVideo').custom((value, { req }) => {
        try {
            if ((!value && req.body.video) || (value && !req.body.video)) {
                throw new Error('Video không được sử dụng hoặc bỏ trống');
            }
            return true;
        } catch (e) {
            return Promise.reject(e.message);
        }
    }),
    check('content').trim()
        .not().isEmpty().withMessage('Nội dung không được bỏ trống')
        .custom(value => value.replace(/<\/?[^>]+(>|$)/g, '').trim())
        .withMessage('Nội dung không được bỏ trống'),
    check('slug').trim()
        .custom(async (value, { req }) => {
            if (!value) {
                return true;
            }
            try {
                const oldArticle = await BlogArticleRepository.getDetail({ _id: req.params.id }, { select: '-_id slug' });
                const createdTime = dateHelper.getTimeInSlug(oldArticle.slug);
                const article = await BlogArticleRepository.checkExistWithTrashed({
                    _id: { $ne: req.params.id },
                    slug: `${getSlug(value)}-${createdTime}`,
                });
                if (article) {
                    throw new Error('Tiêu đề đã được sử dụng');
                }
                req.attributes = { createdTime };
            } catch (e) {
                return Promise.reject(e.message);
            }
        }),
];

module.exports = { createArticleRequest, editArticleRequest };
