const mongoose = require('mongoose');
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

    getNewestProducts() {
        return this.model
            .find({
                isDraft: false,
                isApproved: true,
            })
            .sort({ createdAt: -1 })
            .limit(9);
    }

    async clientList(type, options) {
        options.query.page = Math.abs(parseInt(options.query.page, 10)) || 1;
        options.limit = 20;
        const search = new RegExp(options.query.search, 'i');
        const conditions = {
            name: search,
            isDraft: false,
            isApproved: true,
            deletedAt: null,
        };
        if (type) {
            conditions.type = type;
        }
        const sort = {};
        switch (options.query.sort) {
            case 'productName':
                sort.name = 1;
                break;
            case 'priceLowToHigh':
                sort['price.number'] = 1;
                break;
            case 'priceHighToLow':
                sort['price.number'] = -1;
                break;
            default: sort.createdAt = -1;
        }
        const [total, docs] = await Promise.all([
            this.model.countDocuments(conditions),
            this.model
                .find(conditions)
                .select('name image.cover price.number discount slug')
                .skip((options.query.page - 1) * options.limit)
                .limit(options.limit)
                .sort(sort),
        ]);
        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
    }

    async adminList(userId, options) {
        options.query.page = Math.abs(parseInt(options.query.page, 10)) || 1;
        options.limit = commonConstant.limit;
        const conditions = { deletedAt: null };
        conditions.$or = [{ name: new RegExp(options.query.search, 'i') }, { sku: options.query.search }];
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
                .sort({ isDraft: -1, createdAt: -1 })
                .select('name price image slug type quantity isApproved isDraft sku updatedAt'),
        ]);
        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
    }

    async clientSearch(options) {
        options.query.page = Math.abs(parseInt(options.query.page, 10)) || 1;
        options.limit = 20;
        const conditions = {
            isDraft: false,
            isApproved: true,
            deletedAt: null,
        };
        if (options.query.type === 'productName') {
            conditions.name = new RegExp(options.query.search.trim(), 'i');
        }
        if (options.query.productType
            && mongoose.Types.ObjectId.isValid(options.query.productType)) {
            conditions.type = options.query.productType;
        }
        if (options.query.startPrice && options.query.endPrice) {
            conditions['price.number'] = {
                $gte: parseInt(options.query.startPrice, 10),
                $lte: parseInt(options.query.endPrice, 10),
            };
        } else if (options.query.startPrice) {
            conditions['price.number'] = {
                $gte: parseInt(options.query.startPrice, 10),
            };
        } else if (options.query.endPrice) {
            conditions['price.number'] = {
                $lte: parseInt(options.query.endPrice, 10),
            };
        }
        const sort = {};
        switch (options.query.sort) {
            case 'productName':
                sort.name = 1;
                break;
            case 'priceLowToHigh':
                sort['price.number'] = 1;
                break;
            case 'priceHighToLow':
                sort['price.number'] = -1;
                break;
            default: sort.createdAt = -1;
        }
        const [total, docs] = await Promise.all([
            this.model.countDocuments(conditions),
            this.model
                .find(conditions)
                .select('name image.cover price.number slug')
                .skip((options.query.page - 1) * options.limit)
                .limit(options.limit)
                .sort(sort),
        ]);
        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
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

    clientCheckExistById(id, options = {}) {
        return this.model
            .findOne({
                _id: id,
                isApproved: true,
                isDraft: false,
                deletedAt: null,
            })
            .select(options.select || '-updatedAt deletedAt -__v');
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
            'image.cover': data.image,
            discount: data.discount,
            info: data.info,
            detail: data.detail,
            isDraft: !!data.isDraft,
            slug: getSlug(`${data.slug || data.name}-${data.createdTime}`),
        };
        return this.baseCreate(product);
    }

    update(data, id) {
        if (data.image && data.imageUrl) {
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
        if (data.image) {
            product['image.cover'] = data.image;
        }

        return this.baseUpdate(product, { _id: id });
    }

    clientShow(slug) {
        return this.model
            .findOne({
                slug,
                isApproved: true,
                isDraft: false,
                deletedAt: null,
            })
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

    getProductsByType(typeId) {
        return this.model
            .find({
                type: typeId,
                isApproved: true,
                isDraft: false,
                deletedAt: null,
            })
            .sort({ createdAt: -1 })
            .limit(8)
            .populate({
                path: 'author',
                select: '-_id name',
                match: { deletedAt: null },
           })
           .populate({
                path: 'type',
                select: '-_id name slug',
                match: { deletedAt: null },
           })
           .select('-isApproved -updatedAt');
    }

    async storeImages(images, id, type) {
        const article = await this.getDetail({ _id: id }, { select: '_id image.array' });
        if (type === '2' || !article.image.array) {
            article.image.array = images;
        } else if (type === '1' && article.image.array) {
            article.image.array = article.image.array.concat(images);
        }

        return article.save();
    }
}

module.exports = ProductRepository;
