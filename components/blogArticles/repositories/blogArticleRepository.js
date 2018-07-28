const BlogArticle = require('../models/blogArticle');
const BaseRepository = require('../../../infrastructure/repositories/baseRepository');
const CommonConstant = require('../../../constants/commonConstant');
const PaginationHelper = require('../../../helpers/pagination.helper');

class BlogArticleRepository extends BaseRepository
{
    model() {
        return BlogArticle;
    }

    async adminList(userSlug, options) {
        options.query.page = (options.query.page === undefined) ? 1 : parseInt(options.query.page);
        let conditions = { deletedAt: null };
        let populate = [{
            path: 'category',
            select: '-_id name'
        }];
        if (!userSlug) {
            populate.push({
                path: 'author',
                select: '-_id name slug',
                match: { slug: userSlug }
            });
        } else {
            conditions.user.slug = userSlug;
        }
        let articles = await this.model.paginate(
            conditions,
            {
                select: 'title slug createdAt',
                populate: populate,
                sort: { createdAt: -1 }, page: options.query.page, limit: CommonConstant.limit
            }
        );
        PaginationHelper.setUpUrl(articles, options);

        return articles;
    }
}

module.exports = BlogArticleRepository;