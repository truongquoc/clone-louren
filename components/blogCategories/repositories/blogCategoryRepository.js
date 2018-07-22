const BlogCategory = require('../models/blogCategory');
const BaseRepository = require('../../../infrastructure/repositories/baseRepository').BaseRepository;

class BlogCategoryRepository extends BaseRepository
{
    model() {
        return BlogCategory;
    }

    async store(data) {
        const category = {
            name: data.name,
            slug: data.slug || data.name,
        };

        return await this.create(category);
    }

    async update(data) {
        const category = await this.getDetail({ $or: [{ name: data.name, slug: data.slug }], deletedAt: { $ne: null } });
        if (category) {
            category.deletedAt = null;

            return category.save();
        }

        // const
    }
}

module.exports = BlogCategoryRepository;
