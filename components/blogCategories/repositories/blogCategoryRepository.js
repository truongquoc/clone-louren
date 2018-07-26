const BlogCategory = require('../models/blogCategory');
const BaseRepository = require('../../../infrastructure/repositories/baseRepository').BaseRepository;

class BlogCategoryRepository extends BaseRepository
{
    model() {
        return BlogCategory;
    }

    store(data) {
        const category = {
            name: data.name,
            
            slug: data.slug || data.name,
        };

        return this.baseCreate(category);
    }

    async update(data, id) {
        let category = await this.getDetailWithTrashed({
            _id: { $ne: id },
            $or: [{ name: data.name, slug: data.slug }]
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
