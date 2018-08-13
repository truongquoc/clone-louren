const getSlug = require('speakingurl');
const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');
const District = require('../models/District');

class DistrictRepository extends ClassificationRepository {
    model() {
        return District;
    }

    list(options) {
        options.populate = [{
            path: 'city',
            select: '_id name',
            match: { deletedAt: null },
        }];
        return this.paginate({}, options);
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
        let district = await this.checkExistOnlyTrashed({
            _id: { $ne: id },
            $or: [{ name: data.name }, { slug: getSlug(data.slug) }],
        });
        if (district) {
            // Move deleted articles from this category to the category which will be updated.
            // call 1 function to handle it
            await district.remove();
        }
        district = {
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
}

module.exports = DistrictRepository;