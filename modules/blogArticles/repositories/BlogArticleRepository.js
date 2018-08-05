const BlogArticle = require('../models/BlogArticle');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');
const commonConstant = require('../../../constants/commonConstant');
const paginationHelper = require('../../../helpers/paginationHelper');

class BlogArticleRepository extends BaseRepository {
    model() {
        return BlogArticle;
    }

    async adminList(userSlug, options) {
        options.query.page = parseInt(options.query.page, 10) || 1;
        const search = new RegExp(options.query.search, 'i');
        const populate = [{
            path: 'category',
            select: '-_id name',
        }];
        if (!userSlug) {
            populate.push({
                path: 'author',
                select: '-_id name',
                populate: {
                    path: 'roles',
                    select: '-_id name',
                },
            });
        } else {
            populate.push({
                path: 'author',
                select: '-_id',
                match: { slug: userSlug },
            });
        }
        const articles = await this.model.paginate(
            { title: search, deletedAt: null },
            {
                select: 'title isApprove slug createdAt',
                populate,
                sort: { createdAt: -1 },
                page: options.query.page,
                limit: commonConstant.limit,
            },
        );
        paginationHelper.setUpUrl(articles, options);

        return articles;
    }

    create(data, user) {
        const article = {
            category: data.category,
            tags: data.tags,
            author: user.id,
            title: data.title,
            content: data.content,
            display: {
                image: data.image,
                video: data.video,
                useVideo: !!data.useVideo,
            },
            isDraft: !!data.isDraft,
            slug: `${data.slug || data.title}-${data.createdTime}`,
        };
        return this.baseCreate(article);
    }

    approve(id) {
        return this.baseUpdate({ isApprove: true }, { _id: id });
    }
}

module.exports = BlogArticleRepository;