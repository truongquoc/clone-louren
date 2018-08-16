const BlogCategory = require('../models/BlogCategory');
const BlogArticleRepositoryClass = require('../../blogArticles/repositories/BlogArticleRepository');
const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');

const BlogArticleRepository = new BlogArticleRepositoryClass();

class BlogCategoryRepository extends ClassificationRepository {
    model() {
        return BlogCategory;
    }

    async delete(id) {
        await BlogArticleRepository.baseDelete({ category: id });

        return this.deleteById(id);
    }
}

module.exports = BlogCategoryRepository;
