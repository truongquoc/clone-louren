const getSlug = require('speakingurl');
const commonConstant = require('../../../constants/commonConstant');
const paginationHelper = require('../../../helpers/paginationHelper');
const District = require('../models/District');
const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');
const PropertyArticleRepositoryClass = require('../../propertyArticles/repositories/PropertyArticleRepository');

const PropertyArticleRepository = new PropertyArticleRepositoryClass();

class DistrictRepository extends ClassificationRepository {
    model() {
        return District;
    }

    async list(options) {
        options.query.page = parseInt(options.query.page, 10) || 1;
        options.limit = commonConstant.limit;
        const [total, docs] = await Promise.all([
            this.model.estimatedDocumentCount({ deletedAt: null }),
            this.model
                .find({ deletedAt: null })
                .populate('city', '_id name', { deletedAt: null })
                .skip((options.query.page - 1) * options.limit)
                .limit(options.limit)
                .sort({ createdAt: -1 }),
        ]);
        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
    }

    async create(data) {
        let district = await this.getDetailOnlyTrashed({
            $or: [{ name: data.name }, { slug: getSlug(data.slug) }],
        });
        if (district) {
            district.city = data.city;
            district.name = data.name;
            district.slug = data.slug;
            district.createdAt = new Date();
            district.deletedAt = null;
            return district.save();
        }
        district = {
            city: data.city,
            name: data.name,
            slug: getSlug(data.slug || data.name),
        };
        district = await this.baseCreate(district);
        return District.populate(district, {
            path: 'city',
            select: '_id name',
        });
    }

    async update(data, id) {
        const district = {
            city: data.city,
            name: data.name,
            slug: getSlug(data.slug || data.name),
        };
        return this.model.findOneAndUpdate(
            { _id: id, deletedAt: null },
            district,
            { new: true },
        ).populate('city', '_id name', { deletedAt: null });
    }

    async delete(id) {
        await PropertyArticleRepository.baseDelete({ district: id });

        return this.deleteById(id);
    }
}

module.exports = DistrictRepository;
