const getSlug = require('speakingurl');
const paginationHelper = require('../../../helpers/paginationHelper');
const storageHelper = require('../../../helpers/storage/storageHelper');
const commonConstant = require('../../../constants/commonConstant');
const ArticleRepository = require('../../../infrastructure/repositories/ArticleRepository');
const PropertyArticle = require('../models/PropertyArticle');

class PropertyArticleRepository extends ArticleRepository {
    model() {
        return PropertyArticle;
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

    async search(params) {
        return this.model.search(params).find({ deletedAt: null });
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
                path: 'category',
                select: '_id name slug',
                match: { deletedAt: null },
            })
            .populate({
                path: 'status',
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
        const conditions = [];
        if (data.conditions) {
            for (const name in data.conditions) {
                if (Object.prototype.hasOwnProperty.call(data.conditions, name)) {
                    conditions.push({ condition: name, quantity: data.conditions[name] });
                }
            }
        }
        const article = {
            category: data.category,
            type: data.type,
            status: data.status,
            city: data.city,
            district: data.district,
            conditions,
            amenities: data.amenities,
            author: user._id,
            title: data.title,
            description: data.description,
            display: {
                image: data.image,
                video: data.video.replace('watch?v=', 'embed/'),
            },
            address: data.address,
            price: {
                value: data.price.value,
                display: data.price.type,
                type: data.price.type,
                isAgreement: !!data.price.isAgreement,
            },
            area: data.area,
            isDraft: !!data.isDraft,
            slug: getSlug(`${data.slug || data.title}-${data.createdTime}`),
        };
        return this.baseCreate(article);
    }

    update(data, id) {
        const conditions = [];
        if (data.conditions) {
            for (const name in data.conditions) {
                if (Object.prototype.hasOwnProperty.call(data.conditions, name)) {
                    conditions.push({ condition: name, quantity: data.conditions[name] });
                }
            }
        }
        if (data.image) {
            storageHelper.storage('s3').destroy(data.imageUrl);
        }
        const article = {
            category: data.category,
            type: data.type,
            status: data.status,
            city: data.city,
            district: data.district,
            conditions,
            amenities: data.amenities,
            title: data.title,
            description: data.description,
            display: {
                image: data.image || data.imageUrl,
                video: data.video.replace('watch?v=', 'embed/'),
            },
            address: data.address,
            price: {
                value: data.price.value,
                display: data.price.type,
                type: data.price.type,
                isAgreement: !!data.price.isAgreement,
            },
            area: data.area,
            isDraft: !!data.isDraft,
            slug: getSlug(`${data.slug || data.title}-${data.createdTime}`),
        };
        return this.baseUpdate(article, { _id: id });
    }

    async storeImages(images, id, type) {
        const article = await this.getDetail({ _id: id }, { select: '_id display' });
        if (type === '2' || !article.display.images) {
            article.display.images = images;
        } else if (type === '1' && article.display.images) {
            article.display.images = article.display.images.concat(images);
        }

        return article.save();
    }
}

module.exports = PropertyArticleRepository;
