const BlogCategory = require('../models/BlogCategory');

const BlogArticleRepositoryClass = require('../../blogArticles/repositories/BlogArticleRepository');
const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');

const BlogArticleRepository = new BlogArticleRepositoryClass();

class BlogCategoryRepository extends ClassificationRepository {
    model() {
        return BlogCategory;
    }

    async getCategories() {
        let categories = await this.baseGet();
        const getNameMethod = categories[0].getName;
        categories = JSON.parse(JSON.stringify(categories));
        const commands = categories.map(category => BlogArticleRepository.baseCount({
            category: category._id,
            isApproved: true,
            isDraft: false,
        }));
        const articlesQuantity = await Promise.all(commands);
        articlesQuantity.forEach((number, index) => {
            categories[index].articlesCount = number;
            categories[index].getName = getNameMethod;
        });

        return categories;
    }

    async delete(id) {
        await BlogArticleRepository.baseDelete({ category: id });

        return this.deleteById(id);
    }
}

module.exports = BlogCategoryRepository;
