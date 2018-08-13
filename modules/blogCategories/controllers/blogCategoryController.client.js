const BlogArticleRepositoryClass = require('../../blogArticles/repositories/BlogArticleRepository');
const BlogCategoryRepositoryClass = require('../repositories/BlogCategoryRepository');
const paginationHelper = require('../../../helpers/paginationHelper');
const responseHelper = require('../../../helpers/responseHelper');

const BlogArticleRepository = new BlogArticleRepositoryClass();
const BlogCategoryRepository = new BlogCategoryRepositoryClass();

const index = async (req, res, next) => {
    try {
        const { query } = req;
        const blogCategory = await BlogCategoryRepository.checkExistBySlug(req.params.slug);
        const [blogArticles] = await Promise.all([
            BlogArticleRepository.clientList({
                name: 'category',
                value: blogCategory._id,
            }, {
                query,
                pageUrl: req.baseUrl,
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