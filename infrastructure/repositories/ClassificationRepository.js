const getSlug = require('speakingurl');
const BaseRepository = require('./BaseRepository');

class ClassificationRepository extends BaseRepository {
    constructor() {
        super();
        if (new.target === ClassificationRepository) {
            throw new TypeError('Cannot construct Abstract instances directly');
        }
    }

    checkExistBySlug(slug, options = { select: '_id name' }) {
        return this.model.findOne({ slug }).select(options.select);
    }

    async create(data) {
        let classification = await this.getDetailOnlyTrashed({
            $or: [{ name: data.name }, { slug: getSlug(data.slug) }],
        });
        if (classification) {
            classification.name = data.name;
            classification.slug = data.slug;
            classification.createdAt = new Date();
            classification.deletedAt = null;

            return classification.save();
        }
        classification = {
            name: data.name,
            slug: data.slug || data.name,
        };

        return this.baseCreate(classification);
    }

    async update(data, id) {
        let classification = await this.checkExistOnlyTrashed({
            _id: { $ne: id },
            $or: [{ name: data.name }, { slug: getSlug(data.slug) }],
        });
        if (classification) {
            // Move deleted articles from this category to the category which will be updated.
            // call 1 function to handle it
            await classification.remove();
        }
        classification = {
            name: data.name,
            slug: data.slug || data.name,
        };

        return this.model.findOneAndUpdate(
            { _id: id, deletedAt: null },
            classification,
            { new: true },
        );
    }
}

module.exports = ClassificationRepository;
