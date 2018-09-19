const responseHelper = require('../../helpers/responseHelper');
const BlogArticleRepositoryClass = require('../../modules/blogArticles/repositories/BlogArticleRepository');
const BlogCategoryRepositoryClass = require('../../modules/blogCategories/repositories/BlogCategoryRepository');
const BlogTagRepositoryClass = require('../../modules/blogTags/repositories/BlogTagRepository');

const BlogArticleRepository = new BlogArticleRepositoryClass();
const BlogCategoriesRepository = new BlogCategoryRepositoryClass();
const BlogTagRepository = new BlogTagRepositoryClass();

const blogArticleRight = async (req, res, next) => {
    try {
        const [recentArticles, categories, newTags] = await Promise.all([
            BlogArticleRepository.homeGetNewest(),
            BlogCategoriesRepository.getCategories(),
            BlogTagRepository.getNewTags(),
        ]);

        res.locals.recentArticles = recentArticles;
        res.locals.categories = categories;
        res.locals.newTags = newTags;

        return next();
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    blogArticleRight,
};
