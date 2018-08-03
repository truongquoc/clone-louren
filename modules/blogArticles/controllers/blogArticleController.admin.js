const { validationResult } = require('express-validator/check');
const BlogArticleRepositoryClass = require('../repositories/BlogArticleRepository');
const BlogCategoryRepositoryClass = require('../../blogCategories/repositories/BlogCategoryRepository');
const BlogTagRepositoryClass = require('../../blogTags/repositories/BlogTagRepository');
const paginationHelper = require('../../../helpers/paginationHelper');
const responseHelper = require('../../../helpers/responseHelper');
const imageHelper = require('../../../helpers/imageHelper');
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
        const blogArticles = await BlogArticleRepository.adminList(req.session.cUser.slug, {
            query,
            pageUrl: req.baseUrl,
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
            BlogCategoryRepository.get(),
            BlogTagRepository.get(),
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
        req.flash('oldValue', data);
        req.flash('errors', errors.mapped());
        return res.redirectBack();
    }
    data.createdTime = req.attributes.createdTime;
    try {
        if (req.file) {
            const buffer = imageHelper.optimizeImage(req.file, {
                width: 750,
                quality: 75,
            });
            data.image = await storageHelper.storage('s3').upload('articles', buffer, 'public-read');
        }
        await BlogArticleRepository.create(data, req.session.cUser);
        return res.redirect('/admin/blog/articles/me');
    } catch (e) {
        return next(responseHelper.error(e.message));
    }
};

const approve = async (req, res) => {
    try {
        await BlogArticleRepository.approve(req.params.id);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await BlogArticleRepository.delete(id);

        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index, showMyArticles, create, store, approve, destroy,
};
