const getSlug = require('speakingurl');
const Product = require('../models/Product');
const ArticleRepository = require('../../../infrastructure/repositories/ArticleRepository');
const commonConstant = require('../../../constants/commonConstant');
const paginationHelper = require('../../../helpers/paginationHelper');
const storageHelper = require('../../../helpers/storage/storageHelper');

class ProductRepository extends ArticleRepository {
    model() {
        return Product;
    }

    async clientList(slug, options) {
        options.query.page = parseInt(options.query.page, 10) || 1;
        options.limit = commonConstant.clientLimit;
        const search = new RegExp(options.query.search, 'i');
        const conditions = {
            name: search,
            isApproved: true,
            isDraft: false,
            deletedAt: null,
        };
        if (slug) {
            conditions[slug.name] = slug.value;
        }
        const [total, docs] = await Promise.all([
            this.model.countDocuments(conditions),
            this.model
                .find(conditions)
                .populate('type', '-_id name slug', { deletedAt: null })
                .populate('author', '-_id name', { deletedAt: null })
                .skip((options.query.page - 1) * options.limit)
                .limit(options.limit)
                .sort({ createdAt: -1 })
                .select('name price image slug type updatedAt'),
        ]);
        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
    }

    async adminList(userId, options) {
        options.query.page = parseInt(options.query.page, 10) || 1;
        options.limit = commonConstant.limit;
        const search = new RegExp(options.query.search, 'i');
        const conditions = { name: search, deletedAt: null, isDraft: options.isDraft };
        if (!userId) {
            conditions.isDraft = false;
        } else {
            conditions.author = userId;
        }
        const [total, docs] = await Promise.all([
            this.model.countDocuments(conditions),
            this.model
                .find(conditions)
                .populate('type', '-_id name', { deletedAt: null })
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
                .select('name price image slug type quantity sku updateddAt'),
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
            .select('name price image slug type updatedAt')
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
                path: 'type',
                select: '_id name slug',
                match: { deletedAt: null },
            })
            .select('-isApproved -updatedAt');
    }

    create(data, user) {
        const product = {
            type: data.type,
            author: user._id,
            name: data.name,
            quantity: data.quantity,
            sku: data.sku,
            price: {
                number: data.priceValue,
                string: data.priceText,
            },
            discount: data.discount,
            info: data.info,
            detail: data.detail,
            isDraft: !!data.isDraft,
            slug: getSlug(`${data.slug || data.name}-${data.createdTime}`),
        };
        return this.baseCreate(product);
    }

    update(data, id) {
        if (data.image) {
            storageHelper.storage('s3').destroy(data.imageUrl);
        }
        const product = {
            type: data.type,
            name: data.name,
            quantity: data.quantity,
            sku: data.sku,
            price: {
                number: data.priceValue.replace(/[($)\s\._\-]+/g, ''),
                string: data.priceText,
            },
            discount: data.discount,
            info: data.info,
            detail: data.detail,
            isDraft: !!data.isDraft,
            slug: getSlug(`${data.slug || data.name}-${data.createdTime}`),
        };
        return this.baseUpdate(product, { _id: id });
    }
}

module.exports = ProductRepository;
