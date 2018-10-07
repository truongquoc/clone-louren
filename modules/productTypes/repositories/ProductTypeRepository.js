const getSlug = require('speakingurl');
const commonConstant = require('../../../constants/commonConstant');
const paginationHelper = require('../../../helpers/paginationHelper');
const ProductType = require('../models/ProductType');
const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');
const ProductRepositoryClass = require('../../products/repositories/ProductRepository');

const ProductRepository = new ProductRepositoryClass();

class ProductTypeRepository extends ClassificationRepository {
    model() {
        return ProductType;
    }

    async list(options) {
        options.query.page = Math.abs(parseInt(options.query.page, 10)) || 1;
        options.limit = commonConstant.limit;
        const [total, docs] = await Promise.all([
            this.model.countDocuments(),
            this.model
                .find()
                .populate('parentType', '_id name', { deletedAt: null })
                .skip((options.query.page - 1) * options.limit)
                .limit(options.limit)
                .sort({ createdAt: -1 })
                .select('-__v'),
        ]);
        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
    }

    get() {
        return this.model
            .find({
                deletedAt: null,
            })
            .select('_id parentType name names slug')
            .sort({ createdAt: -1 });
    }

    async create(data) {
        let type = await this.getDetailOnlyTrashed({
            $or: [{ name: data.name }, { 'names.en': data.nameEn }, { slug: getSlug(data.slug) }],
        });
        if (data.parentType && data.parentType === '0') {
            data.parentType = undefined;
        }
        if (type) {
            type.parentType = data.parentType;
            type.name = data.name;
            type['names.en'] = data.nameEn;
            type.slug = getSlug(data.slug || data.name);
            type.createdAt = new Date();
            type.deletedAt = null;

            return type.save();
        }
        type = {
            parentType: data.parentType,
            name: data.name,
            'names.en': data.nameEn,
            slug: getSlug(data.slug || data.name),
        };
        type = await this.baseCreate(type);
        if (!data.parentType) {
            return type;
        }
        return ProductType.populate(type, {
            path: 'parentType',
            select: '-_id name',
        });
    }

    async update(data, id) {
        if (data.parentType && data.parentType === '0') {
            data.parentType = undefined;
        }
        let type = {
            parentType: data.parentType,
            name: data.name,
            'names.en': data.nameEn,
            slug: getSlug(data.slug || data.name),
        };
        type = await this.model.findOneAndUpdate(
            { _id: id, deletedAt: null },
            type,
            { new: true },
        );
        if (!data.parentType) {
            return type;
        }
        return ProductType.populate(type, {
            path: 'parentType',
            select: '-_id name',
        });
    }

    async delete(id) {
        await ProductRepository.forceDelete({ type: id, deletedAt: { $ne: null } });
        await ProductRepository.baseDelete({ type: id });
        // delete product here
        return Promise.all([
            this.baseUpdate({ parentType: undefined }, { parentType: id }),
            this.deleteById(id),
        ]);
    }

    async revert(id) {
        // revert product here
        return Promise.all([
            ProductRepository.baseRevert({ type: id }),
            this.revertById(id),
        ]);
    }
}

module.exports = ProductTypeRepository;
