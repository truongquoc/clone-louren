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
        const [blogArticle, postNext] = await Promise.all([
            BlogArticleRepository.show(req.params.slug),
            BlogArticleRepository.postNext(req.params.slug),
        ]);

        return res.render('modules/blogArticles/client/detail', {
            blogArticle,
            postNext,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};


module.exports = { index, show };
