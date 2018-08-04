const BlogCategory = require('../models/BlogCategory');
const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');

class BlogCategoryRepository extends ClassificationRepository {
    model() {
        return BlogCategory;
    }
}

module.exports = BlogCategoryRepository;
