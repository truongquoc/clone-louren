const getSlug = require('speakingurl');
const BaseRepository = require('./BaseRepository');

class ClassificationRepository extends BaseRepository {
    constructor() {
        super();
        if (new.target === ClassificationRepository) {
            throw new TypeError('Cannot construct Abstract instances directly');
        }
    }

    getDetailBySlug(slug) {
        return this.model.findOne({ slug }).select('_id name slug');
    }

    checkExistBySlug(slug) {
        return this.model.findOne({ slug }).select('_id');
    }

    async create(data) {
        let classification = await this.getDetailOnlyTrashed({
            $or: [{ name: data.name }, { slug: getSlug(data.slug) }],
        });
        if (classification) {
            classification.name = data.name;
            classification.slug = getSlug(data.slug || data.name);
            classification.createdAt = new Date();
            classification.deletedAt = null;

            return classification.save();
        }
        classification = {
            name: data.name,
            slug: getSlug(data.slug || data.name),
        };

        return this.baseCreate(classification);
    }

    async update(data, id) {
        const classification = {
            name: data.name,
            slug: getSlug(data.slug || data.name),
        };

        return this.model.findOneAndUpdate(
            { _id: id, deletedAt: null },
            classification,
            { new: true },
        );
    }
}

module.exports = ClassificationRepository;
