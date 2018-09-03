const getSlug = require('speakingurl');
const moment = require('moment');
const clientHelper = require('../../../helpers/clientHelper');
const paginationHelper = require('../../../helpers/paginationHelper');
const storageHelper = require('../../../helpers/storage/storageHelper');
const commonConstant = require('../../../constants/commonConstant');
const ArticleRepository = require('../../../infrastructure/repositories/ArticleRepository');
const PropertyArticle = require('../models/PropertyArticle');

class PropertyArticleRepository extends ArticleRepository {
    model() {
        return PropertyArticle;
    }

    homeList(categories, options) {
        const getArticles = (categoryId) => {
            const conditions = {
                isApproved: true,
                isDraft: false,
                deletedAt: null,
            };
            if (categoryId) {
                conditions.category = categoryId;
            }
            return this.model
                .find(conditions)
                .populate('status', 'name', { deletedAt: null })
                .populate('conditions.condition', 'name icon', { deletedAt: null })
                .populate('author', 'name', { deletedAt: null })
                .select('title address display price slug createdAt')
                .limit(6);
        };
        let commands = [getArticles()];
        commands = commands.concat(Object.values(categories).map(category => (
            getArticles(category)
        )));

        return Promise.all(commands);
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

    async clientList(slug, options) {
        options.query.page = parseInt(options.query.page, 10) || 1;
        options.limit = commonConstant.clientLimit;
        const sort = clientHelper.parseSorting(options.query.sort);
        const conditions = {
            isApproved: true,
            isDraft: false,
            deletedAt: null,
        };
        if (slug) {
            conditions[slug.name] = slug.value;
        }
        const [total, docs] = await Promise.all([
            this.model.search(options.query).estimatedDocumentCount(conditions),
            this.model
                .search(options.query)
                .find(conditions)
                .populate('conditions.condition', 'name icon', {
                    name: { $in: ['Tivi', 'Giường ngủ', 'Gara', 'Ban công', 'Bồn tắm'] },
                    deletedAt: null,
                })
                .populate('status', 'name', { deletedAt: null })
                .populate('author', 'name', { deletedAt: null })
                .skip((options.query.page - 1) * options.limit)
                .limit(options.limit)
                .sort(sort)
                .select('conditions title address display price.display slug createdAt'),
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
            .sort({ createdAt: -1 })
            .populate('conditions.condition', 'name icon', {
                name: { $in: ['Tivi', 'Giường ngủ', 'Gara', 'Bồn tắm'] },
                deletedAt: null,
            })
            .limit(4);
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
            .populate({
                path: 'conditions.condition',
                select: 'name',
                match: { deletedAt: null },
            })
            .populate({
                path: 'amenities',
                select: 'name',
                match: { deletedAt: null },
            })
            .populate({
                path: 'city',
                select: 'name',
                match: { deletedAt: null },
            })
            .populate({
                path: 'district',
                select: 'name',
                match: { deletedAt: null },
            })
            .populate({
                path: 'price.type',
                select: 'name',
                match: { deletedAt: null },
            })
            .select('-isApproved -updatedAt -__v');
    }

    countByCategory(categories) {
        const self = this;
        categories.forEach(async (category) => {
            category.countPropertyArticles = await self.model.estimatedDocumentCount({
                category: category._id,
                isApproved: true,
                isDraft: false,
                deletedAt: null,
            });
            return category;
        });

        return categories;
    }

    async getRandomArticles() {
        const articlesQuantity = await this.model.estimatedDocumentCount({
            isApproved: true,
            isDraft: false,
            deletedAt: null,
            createdAt: {
                $lt: moment().subtract(6, 'm'),
            },
        });
        let skip = Math.random() * (articlesQuantity - 3);
        skip = skip < 3 ? 0 : skip;
        return this.model
            .find({
                isApproved: true,
                isDraft: false,
                deletedAt: null,
                createdAt: {
                    $lt: moment().subtract(6, 'm'),
                },
            })
            .populate({
                path: 'price.type',
                select: 'name',
                match: { deletedAt: null },
            })
            .skip(skip)
            .limit(3)
            .select('title display.image price.display slug createdAt');
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
                display: data.price.display,
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
                display: data.price.display,
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
