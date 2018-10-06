const url = require('url');
const BlogArticleRepositoryClass = require('../repositories/BlogArticleRepository');
const paginationHelper = require('../../../helpers/paginationHelper');
const responseHelper = require('../../../helpers/responseHelper');

const BlogArticleRepository = new BlogArticleRepositoryClass();

const index = async (req, res, next) => {
    const { query } = req;
    query.search = query.search ? query.search.trim() : '';
    try {
        const blogArticles = await BlogArticleRepository.clientList(undefined, {
            query,
            pageUrl: url.parse(req.originalUrl).pathname,
        });
        blogArticles.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/blogArticles/client/list', {
            blogArticles,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const show = async (req, res, next) => {
    const { query } = req;
    try {
        const blogArticle = await BlogArticleRepository.show(req.params.slug);
        const relatedArticles = await BlogArticleRepository.relatedArticles(
            blogArticle._id, blogArticle.category._id,
        );

        return res.render('modules/blogArticles/client/detail', {
            blogArticle,
            relatedArticles,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};


module.exports = { index, show };
