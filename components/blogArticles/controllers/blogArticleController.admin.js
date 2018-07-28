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
            page: query.page
        });
    } catch (e) {
        next(ResponseHelper.error(e.message));
    }
};

module.exports = { index };