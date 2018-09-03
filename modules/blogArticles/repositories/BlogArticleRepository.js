const getSlug = require('speakingurl');
const BlogArticle = require('../models/BlogArticle');
const ArticleRepository = require('../../../infrastructure/repositories/ArticleRepository');
const commonConstant = require('../../../constants/commonConstant');
const paginationHelper = require('../../../helpers/paginationHelper');
const storageHelper = require('../../../helpers/storage/storageHelper');

class BlogArticleRepository extends ArticleRepository {
    model() {
        return BlogArticle;
    }

    async clientList(slug, options) {
        options.query.page = parseInt(options.query.page, 10) || 1;
        options.limit = commonConstant.clientLimit;
        const search = new RegExp(options.query.search, 'i');
        const conditions = {
            title: search,
            isApproved: true,
            isDraft: false,
            deletedAt: null,
        };
        if (slug) {
            conditions[slug.name] = slug.value;
        }
        const [total, docs] = await Promise.all([
            this.model.estimatedDocumentCount(conditions),
            this.model
                .find(conditions)
                .populate('category', '-_id name slug', { deletedAt: null })
                .populate('author', '-_id name', { deletedAt: null })
                .skip((options.query.page - 1) * options.limit)
                .limit(options.limit)
                .sort({ createdAt: -1 })
                .select('title description display slug createdAt'),
        ]);
        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
    }

    async adminList(userId, options) {
        options.query.page = parseInt(options.query.page, 10) || 1;
        options.limit = commonConstant.limit;
        const search = new RegExp(options.query.search, 'i');
        const conditions = { title: search, deletedAt: null };
        if (!userId) {
            conditions.isDraft = false;
        } else {
            conditions.author = userId;
        }
        const [total, docs] = await Promise.all([
            this.model.estimatedDocumentCount(conditions),
            this.model
                .find(conditions)
                .populate('category', '-_id name', { deletedAt: null })
                .populate({
                    path: 'author',
                    select: '-_id name',
                    match: { deletedAt: null },
                    populate: {
                        path: 'roles',
                        select: '-_id name',
                    },
                })
                .skip((options.query.page - 1) * options.limit)
                .limit(options.limit)
                .sort({ createdAt: -1 })
                .select('title isApproved slug createdAt'),
        ]);
        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
    }

    homeGetNewest() {
        return this.model
            .find({
                isApproved: true,
                isDraft: false,
                deletedAt: null,
            })
            .populate('author', 'name avatar', { deletedAt: null })
            .select('title description display slug')
            .sort({ createdAt: -1 })
            .limit(3);
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
            author: user._id,
            title: data.title,
            description: data.description,
            content: data.content,
            display: {
                image: data.image,
                video: data.video.replace('watch?v=', 'embed/'),
                useVideo: !!data.useVideo,
            },
            isDraft: !!data.isDraft,
            slug: getSlug(`${data.slug || data.title}-${data.createdTime}`),
        };
        return this.baseCreate(article);
    }

    update(data, id) {
        if (data.image) {
            storageHelper.storage('s3').destroy(data.imageUrl);
        }
        const article = {
            category: data.category,
            tags: data.tags,
            title: data.title,
            description: data.description,
            content: data.content,
            display: {
                image: data.image || data.imageUrl,
                video: data.video.replace('watch?v=', 'embed/'),
                useVideo: !!data.useVideo,
            },
            isDraft: !!data.isDraft,
            slug: getSlug(`${data.slug || data.title}-${data.createdTime}`),
        };
        return this.baseUpdate(article, { _id: id });
    }
}

module.exports = BlogArticleRepository;
