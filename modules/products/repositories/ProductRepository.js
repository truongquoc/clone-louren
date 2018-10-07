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

    getNewestProducts(quantity, isDiscounted) {
        const conditions = {
            quantity: { $gt: 0 },
            isDraft: false,
            isApproved: true,
            deletedAt: null,
        };
        if (isDiscounted) {
            conditions.discount = { $gt: 0 };
            conditions['price.isAgreement'] = false;
        }

        return this.model
            .find(conditions)
            .sort({ createdAt: -1 })
            .limit(quantity);
    }

    async clientList(type, options) {
        options.query.page = Math.abs(parseInt(options.query.page, 10)) || 1;
        options.limit = commonConstant.limit;
        const conditions = {
            quantity: { $gt: 0 },
            isDraft: false,
            isApproved: true,
            deletedAt: null,
        };
        if (type) {
            switch (type.name) {
                case 'type':
                    conditions.type = type.value;
                    break;
                case 'tag':
                    conditions.tags = type.value;
                    break;
                case 'discountProducts':
                    conditions.discount = { $gt: 0 };
                    conditions['price.isAgreement'] = false;
                    break;
                case 'rare':
                    conditions.isRare = true;
                    break;
            }
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
                .select('name image.cover price discount slug')
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
                .select('name price image slug discount type quantity isApproved isDraft sku updatedAt'),
        ]);
        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
    }

    async clientSearch(options) {
        options.query.page = Math.abs(parseInt(options.query.page, 10)) || 1;
        options.limit = commonConstant.limit;
        const conditions = {
            quantity: { $gt: 0 },
            isDraft: false,
            isApproved: true,
            deletedAt: null,
        };
        if (options.query.type === 'productName') {
            conditions.name = new RegExp(options.query.search, 'i');
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
                .select('name image.cover discount price slug')
                .skip((options.query.page - 1) * options.limit)
                .limit(options.limit)
                .sort(sort),
        ]);
        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
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
        let { images } = data;
        if (!images) {
            images = [];
        } else if (typeof images === 'string') {
            images = [images];
        }
        const product = {
            type: data.type,
            tags: data.tags,
            author: user._id,
            name: data.name,
            quantity: data.quantity,
            sku: data.sku,
            price: {
                number: data.priceValue,
                isAgreement: !!data.isAgreement,
            },
            image: {
                cover: data.image,
                array: images,
            },
            'image.cover': data.image,
            discount: data.discount || 0,
            info: data.info,
            detail: data.detail,
            isRare: !!data.isRare,
            isDraft: !!data.isDraft,
            slug: getSlug(`${data.slug || data.name}-${data.createdTime}`),
        };
        return this.baseCreate(product);
    }

    update(data, id) {
        if (data.image && data.imageUrl) {
            storageHelper.storage('local').destroy(data.imageUrl);
        }
        let { images } = data;
        if (!images) {
            images = [];
        } else if (typeof images === 'string') {
            images = [images];
        }
        const product = {
            type: data.type,
            tags: data.tags,
            name: data.name,
            quantity: data.quantity,
            sku: data.sku,
            price: {
                number: data.priceValue.replace(/[($)\s\._\-]+/g, ''),
                isAgreement: !!data.isAgreement,
            },
            'image.array': images,
            discount: data.discount || 0,
            info: data.info,
            detail: data.detail,
            isRare: !!data.isRare,
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
                deletedAt: null,
            })
            .populate({
                 path: 'author',
                 select: '-_id name',
                 match: { deletedAt: null },
            })
            .populate({
                 path: 'type',
                 select: '_id name names slug',
                 match: { deletedAt: null },
            })
            .populate({
                path: 'tags',
                select: '_id name names slug',
                match: { deletedAt: null },
            })
            .select('-updatedAt');
    }

    getProductsByType(currentProductId, typeId) {
        return this.model
            .find({
                _id: { $ne: currentProductId },
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
           // .populate({
           //      path: 'type',
           //      select: '-_id name names slug',
           //      match: { deletedAt: null },
           // })
           .select('name image.cover discount price slug');
    }

    async changeImageOrder(images, id) {
        return this.baseUpdate({ 'image.array': images }, { _id: id });
    }
}

module.exports = ProductRepository;
