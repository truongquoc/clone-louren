const mongoose = require('mongoose');
const paginationHelper = require('../../../helpers/paginationHelper');
const Product = require('../models/Product');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');

class ProductRepository extends BaseRepository {
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
        options.query.page = parseInt(options.query.page, 10) || 1;
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
                .select('name image.cover price.number slug')
                .skip((options.query.page - 1) * options.limit)
                .limit(options.limit)
                .sort(sort),
        ]);
        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
    }

    async clientSearch(options) {
        options.query.page = parseInt(options.query.page, 10) || 1;
        options.limit = 20;
        const conditions = {
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
                .select('name image.cover price.number slug')
                .skip((options.query.page - 1) * options.limit)
                .limit(options.limit)
                .sort(sort),
        ]);
        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
    }
}

module.exports = ProductRepository;
