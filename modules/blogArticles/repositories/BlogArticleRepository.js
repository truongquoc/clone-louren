const getSlug = require('speakingurl');
const BlogArticle = require('../models/BlogArticle');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');
const commonConstant = require('../../../constants/commonConstant');
const paginationHelper = require('../../../helpers/paginationHelper');

class BlogArticleRepository extends BaseRepository {
    model() {
        return BlogArticle;
    }

    async clientList(slug, options) {
        options.query.page = parseInt(options.query.page, 10) || 1;
        const search = new RegExp(options.query.search, 'i');
        const conditions = {
            title: search,
            isApproved: true,
            isDraft: false,
            deletedAt: null,
        };
        const populate = [{
            path: 'category',
            select: '-_id name slug',
            match: { deletedAt: null },
        }, {
            path: 'author',
            select: '-_id name',
            match: { deletedAt: null },
        }];
        if (slug) {
            conditions[slug.name] = slug.value;
        }
        const articles = await this.model.paginate(conditions, {
            select: 'title description display slug createdAt',
            populate,
            sort: { createdAt: -1 },
            page: options.query.page,
            limit: commonConstant.clientLimit,
        });
        paginationHelper.setUpUrl(articles, options);

        return articles;
    }

    async adminList(userId, options) {
        options.query.page = parseInt(options.query.page, 10) || 1;
        const search = new RegExp(options.query.search, 'i');
        const conditions = { title: search, deletedAt: null };
        const populate = [{
            path: 'category',
            select: '-_id name',
            match: { deletedAt: null },
        }, {
            path: 'author',
            select: '-_id name',
            match: { deletedAt: null },
        }];
        if (!userId) {
            populate[1].populate = {
                path: 'roles',
                select: '-_id name',
            };
            conditions.isDraft = false;
        } else {
            conditions.author = userId;
        }
        const articles = await this.model.paginate(conditions, {
            select: 'title isApproved slug createdAt',
            populate,
            sort: { createdAt: -1 },
            page: options.query.page,
            limit: commonConstant.limit,
        });
        paginationHelper.setUpUrl(articles, options);

        return articles;
    }

    show(slug) {
        return this.model.findOne({ slug, deletedAt: null })
            .sort({ createdAt: -1 })
            .populate({
                path: 'author',
                select: '-_id name',
                match: { deletedAt: null },
            })
            .populate({
                path: 'tags',
                select: '_id name slug',
                match: { deletedAt: null },
            })
            .populate({
                path: 'category',
                select: '_id name slug',
                match: { deletedAt: null },
            })
            .select('-isApproved -updatedAt');
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
        return this.baseUpdate({ isApproved: true }, { _id: id });
    }
}

module.exports = BlogArticleRepository;
