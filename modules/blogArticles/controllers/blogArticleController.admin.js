const { validationResult } = require('express-validator/check');
const url = require('url');
const getSlug = require('speakingurl');
const BlogArticleRepositoryClass = require('../repositories/BlogArticleRepository');
const BlogCategoryRepositoryClass = require('../../blogCategories/repositories/BlogCategoryRepository');
const BlogTagRepositoryClass = require('../../blogTags/repositories/BlogTagRepository');
const paginationHelper = require('../../../helpers/paginationHelper');
const responseHelper = require('../../../helpers/responseHelper');
const imageHelper = require('../../../helpers/imageHelper');
const dateHelper = require('../../../helpers/dateHelper');
const storageHelper = require('../../../helpers/storage/storageHelper');

const BlogArticleRepository = new BlogArticleRepositoryClass();
const BlogCategoryRepository = new BlogCategoryRepositoryClass();
const BlogTagRepository = new BlogTagRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const blogArticles = await BlogArticleRepository.adminList(undefined, {
            query,
            pageUrl: req.baseUrl,
        });
        blogArticles.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/blogArticles/admin/list', {
            blogArticles, query,
        });
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

const showMyArticles = async (req, res, next) => {
    try {
        const { query } = req;
        const blogArticles = await BlogArticleRepository.adminList(req.session.cUser._id, {
            query,
            pageUrl: url.parse(req.originalUrl).pathname,
        });
        blogArticles.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/blogArticles/admin/me', {
            blogArticles, query,
        });
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

const create = async (req, res, next) => {
    try {
        const [blogCategories, blogTags] = await Promise.all([
            BlogCategoryRepository.baseGet(),
            BlogTagRepository.baseGet(),
        ]);

        return res.render('modules/blogArticles/admin/create', {
            blogCategories, blogTags,
        });
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

const store = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        imageHelper.deleteImage(req.file, false);
        req.flash('oldValue', data);
        req.flash('errors', errors.mapped());
        return res.redirectBack();
    }
    data.createdTime = req.attributes.createdTime;
    try {
        if (req.file) {
            const image = await imageHelper.optimizeImage(req.file, {
                width: 750,
                quality: 75,
            });
            data.image = await storageHelper.storage('s3').upload(`articles/${dateHelper.getSlugCurrentTime()}.jpg`, image, 'public-read');
        }
        await BlogArticleRepository.create(data, req.session.cUser);
        return res.redirect('/admin/blog/articles/me');
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

const edit = async (req, res, next) => {
    try {
        const [blogArticle, blogCategories, blogTags] = await Promise.all([
            BlogArticleRepository.getEditArticle(req.params.slug),
            BlogCategoryRepository.baseGet(),
            BlogTagRepository.baseGet(),
        ]);
        return res.render('modules/blogArticles/admin/edit', {
            blogCategories, blogTags, blogArticle,
        });
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

const update = async (req, res, next) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        imageHelper.deleteImage(req.file, false);
        req.flash('oldValue', data);
        req.flash('errors', errors.mapped());
        return res.redirectBack();
    }
    data.createdTime = req.attributes.createdTime;
    try {
        if (req.file) {
            const image = await imageHelper.optimizeImage(req.file, {
                width: 750,
                quality: 75,
            });
            data.image = await storageHelper.storage('s3').upload(`articles/${dateHelper.getSlugCurrentTime()}.jpg`, image, 'public-read');
        }
        await BlogArticleRepository.update(data, req.params.id);
        return res.redirect(`/admin/blog/articles/edit/${getSlug(`${data.title || data.slug}-${data.createdTime}`)}`);
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

const approve = async (req, res) => {
    try {
        const article = await BlogArticleRepository.approve(req.params.id);

        return res.json(responseHelper.success(article));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await BlogArticleRepository.deleteById(id);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index, showMyArticles, create, store, edit, update, approve, destroy,
};
