const BlogTag = require('../models/BlogTag');
const BlogArticleRepositoryClass = require('../../blogArticles/repositories/BlogArticleRepository');
const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');

const BlogArticleRepository = new BlogArticleRepositoryClass();

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
