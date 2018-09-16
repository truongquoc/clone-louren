const url = require('url');
const BlogArticleRepositoryClass = require('../../blogArticles/repositories/BlogArticleRepository');
const BlogCategoryRepositoryClass = require('../repositories/BlogCategoryRepository');
const paginationHelper = require('../../../helpers/paginationHelper');
const responseHelper = require('../../../helpers/responseHelper');

const BlogArticleRepository = new BlogArticleRepositoryClass();
const BlogCategoryRepository = new BlogCategoryRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const blogCategory = await BlogCategoryRepository.getDetailBySlug(req.params.slug);
        const [blogArticles] = await Promise.all([
            BlogArticleRepository.clientList({
                name: 'category',
                value: blogCategory._id,
            }, {
                query,
                pageUrl: url.parse(req.originalUrl).pathname,
            }),
        ]);

        blogArticles.renderPagination = paginationHelper.renderPagination;
        return res.render('modules/blogCategories/client/list', {
            blogArticles, query, blogCategory,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = { index };
