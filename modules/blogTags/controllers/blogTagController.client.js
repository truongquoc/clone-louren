const url = require('url');
const BlogArticleRepositoryClass = require('../../blogArticles/repositories/BlogArticleRepository');
const BlogTagRepositoryClass = require('../repositories/BlogTagRepository');
const paginationHelper = require('../../../helpers/paginationHelper');
const responseHelper = require('../../../helpers/responseHelper');

const BlogArticleRepository = new BlogArticleRepositoryClass();
const BlogTagRepository = new BlogTagRepositoryClass();

const index = async (req, res, next) => {
    const { query } = req;
    query.search = query.search ? query.search.trim() : '';
    try {
        const blogTag = await BlogTagRepository.getDetailBySlug(req.params.slug);
        const [blogArticles] = await Promise.all([
            BlogArticleRepository.clientList({
                name: 'tags',
                value: blogTag._id,
            }, {
                query,
                pageUrl: url.parse(req.originalUrl).pathname,
            }),
        ]);
        blogArticles.renderPagination = paginationHelper.renderPagination;
        return res.render('modules/blogTags/client/list', {
            blogArticles, query, blogTag,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = { index };
