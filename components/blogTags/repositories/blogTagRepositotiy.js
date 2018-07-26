const BlogTag = require('../models/blogTag');
const BaseRepository = require('../../../infrastructure/repositories/baseRepository').BaseRepository;

class BlogTagRepository extends BaseRepository {
    model() {
        return BlogTag;
    }

    store(data) {
        const tag = {
            name: data.name,
            slug: data.slug || data.name,
        };
        return this.baseCreate(tag);
    }

    async update(data, id) {
        let tag = await this.getDetailWithTrashed({
            _id: { $ne: id }, //???
            $or: [{ name: data.name, slug: data.slug }],
        });
        if( tag ) {
            await tag.remove();
        }
        tag = {
            name: data.name,
            slug: data.slug || data.name,
        };

        return this.model.findOneAndUpdate({ _id: id, deletedAt: null } , tag, { new: true });
    }
}

module.exports = BlogTagRepository;