const BlogArticleRepositoryClass = require('../repositories/BlogArticleRepository');
const BlogCategoryRepositoryClass = require('../../blogCategories/repositories/BlogCategoryRepository');
const responseHelper = require('../../../helpers/responseHelper');

const BlogArticleRepository = new BlogArticleRepositoryClass();
const BlogCategoryRepository = new BlogCategoryRepositoryClass();

const index = () => {

};

const show = async (req, res, next) => {
    try {
        const [blogArticle, blogCategories, recentBlogArticles] = Promise.all([
            BlogArticleRepository.show(req.params.slug),
            BlogCategoryRepository.get(),
            BlogArticleRepository.getRecentArticles(),
        ]);
        return res.render('modules/blogArticles/client/detail', {
            blogArticle, blogCategories, recentBlogArticles,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = { index, show };
