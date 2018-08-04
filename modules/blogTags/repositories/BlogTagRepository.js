const BlogTag = require('../models/BlogTag');
const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');

class BlogTagRepository extends ClassificationRepository {
    model() {
        return BlogTag;
    }
}

module.exports = BlogTagRepository;
