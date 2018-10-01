const BlogTag = require('../models/BlogTag');
const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');

class BlogTagRepository extends ClassificationRepository {
    model() {
        return BlogTag;
    }

    async getNewTags() {
        return this.model
            .find({ deletedAt: null })
            .sort({ createdAt: -1 })
            .select('name slug');
    }
}


module.exports = BlogTagRepository;
