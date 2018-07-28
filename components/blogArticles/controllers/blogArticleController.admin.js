const BlogArticleRepository = new (require('../repositories/blogArticleRepository'))();
const PaginationHelper = require('../../../helpers/pagination.helper');
const ResponseHelper = require('../../../helpers/response.helper');

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const blogArticles = await BlogArticleRepository.adminList(undefined, {
            query: query,
            pageUrl: req.baseUrl
        });
        blogArticles.renderPagination = PaginationHelper.renderPagination;

        return res.render('components/blogArticles/admin/list', {
            blogArticles,
            query: query
        });
    } catch (e) {
        next(ResponseHelper.error(e.message));
    }
};

const showMyArticles = async (req, res, next) => {
    try {
        const { query } = req;
        const blogArticles = await BlogArticleRepository.adminList(req.session.cUser.slug, {
            query: query,
            pageUrl: req.baseUrl
        });
        blogArticles.renderPagination = PaginationHelper.renderPagination;

        return res.render('components/blogArticles/admin/me', {
            blogArticles,
            query: query
        });
    } catch (e) {
        next(ResponseHelper.error(e.message));
    }
};

const approve = async (req, res) => {
    try {
        await BlogArticleRepository.approve(req.params.id);

        return res.json(ResponseHelper.success());
    } catch (e) {
        return res.json(ResponseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await BlogArticleRepository.delete(id);

        return res.json(ResponseHelper.success());
    } catch (e) {
        return res.json(ResponseHelper.error(e.message));
    }
};

module.exports = { index, showMyArticles, approve, destroy };