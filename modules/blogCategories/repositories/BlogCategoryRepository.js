const getSlug = require('speakingurl');
const BlogCategory = require('../models/BlogCategory');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');

class BlogCategoryRepository extends BaseRepository {
    model() {
        return BlogCategory;
    }

    async create(data) {
        let category = await this.getDetailOnlyTrashed({
            $or: [{ name: data.name }, { slug: getSlug(data.slug) }],
        });
        if (category) {
            category.name = data.name;
            category.slug = data.slug;
            category.createdAt = new Date();
            category.deletedAt = null;

            return category.save();
        }
        category = {
            name: data.name,
            slug: data.slug || data.name,
        };

        return this.baseCreate(category);
    }

    async update(data, id) {
        let category = await this.checkExistOnlyTrashed({
            _id: { $ne: id },
            $or: [{ name: data.name }, { slug: getSlug(data.slug) }],
        });
        if (category) {
            // Move deleted articles from this category to the category which will be updated.
            await category.remove();
        }
        category = {
            name: data.name,
            slug: data.slug || data.name,
        };

        return this.model.findOneAndUpdate({ _id: id, deletedAt: null }, category, { new: true });
    }
}

module.exports = BlogCategoryRepository;
