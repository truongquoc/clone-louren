const BlogArticleRepositoryClass = require('../repositories/BlogArticleRepository');
const CategoryArticleRepository = require('../../blogCategories/repositories/BlogCategoryRepository');
const paginationHelper = require('../../../helpers/paginationHelper');
const responseHelper = require('../../../helpers/responseHelper');

const BlogArticleRepository = new BlogArticleRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const [blogArticles] = await Promise.all([
            BlogArticleRepository.clientList(undefined, {
                query,
                pageUrl: req.baseUrl,
            }),
        ]);


        blogArticles.renderPagination = paginationHelper.renderPagination;
        return res.render('modules/blogArticles/client/list', {
            blogArticles, query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const show = async (req, res, next) => {
    try {
        // , blogCategories, recentBlogArticles
        // PropertyCategoryRepository.get(),
        // PropertyArticleRepository.getRecentArticles(),
        const [blogArticle, postNext] = await Promise.all([
            BlogArticleRepository.show(req.params.slug),
            BlogArticleRepository.postNext(req.params.slug),
        ]);


        return res.render('modules/blogArticles/client/detail', {
            blogArticle,
            postNext,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};


module.exports = { index, show };
