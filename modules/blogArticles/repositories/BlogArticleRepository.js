const getSlug = require('speakingurl');
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
        const conditions = { title: search, deletedAt: null };
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
                    match: { deletedAt: null },
                },
            });
            conditions.isDraft = false;
        } else {
            populate.push({
                path: 'author',
                select: '-_id',
                match: { slug: userSlug, deletedAt: null },
            });
        }
        const articles = await this.model.paginate(
            conditions,
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

    show(slug) {
        return this.model.findOne({ slug, deletedAt: null })
            .populate({
                path: 'author',
                select: '-_id name',
            })
            .populate({
                path: 'tags',
                select: '_id name slug',
            })
            .populate({
                path: 'category',
                select: '_id name slug',
            })
            .select('-isApprove -updatedAt');
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
            slug: getSlug(`${data.slug || data.title}-${data.createdTime}`),
        };
        return this.baseCreate(article);
    }

    update(data, id) {
        const article = {
            category: data.category,
            tags: data.tags,
            title: data.title,
            content: data.content,
            display: {
                image: data.image || data.imageUrl,
                video: data.video,
                useVideo: !!data.useVideo,
            },
            isDraft: !!data.isDraft,
            slug: getSlug(`${data.slug || data.title}-${data.createdTime}`),
        };
        return this.baseUpdate(article, { _id: id });
    }

    approve(id) {
        return this.baseUpdate({ isApprove: true }, { _id: id });
    }
}

module.exports = BlogArticleRepository;
