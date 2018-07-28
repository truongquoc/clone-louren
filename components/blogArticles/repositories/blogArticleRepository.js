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
        const search = new RegExp(options.query.search, 'i');
        let populate = [{
            path: 'category',
            select: '-_id name'
        }];
        if (!userSlug) {
            populate.push({
                path: 'author',
                select: '-_id name'
            });
        } else {
            populate.push({
                path: 'author',
                select: '-_id',
                match: { slug: userSlug }
            });
        }
        let articles = await this.model.paginate(
            { title: search, deletedAt: null },
            {
                select: 'title isApprove slug createdAt',
                populate: populate,
                sort: { createdAt: -1 }, page: options.query.page, limit: CommonConstant.limit
            }
        );
        PaginationHelper.setUpUrl(articles, options);

        return articles;
    }

    approve(id) {
        return this.baseUpdate({ isApprove: true }, { _id: id });
    }
}

module.exports = BlogArticleRepository;