const BlogArticleRepositoryClass = require('../repositories/BlogArticleRepository');
const paginationHelper = require('../../../helpers/paginationHelper');
const responseHelper = require('../../../helpers/responseHelper');

const BlogArticleRepository = new BlogArticleRepositoryClass();

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
    index, showMyArticles, approve, destroy,
};
