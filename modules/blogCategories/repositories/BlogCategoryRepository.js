const BlogCategory = require('../models/BlogCategory');

const BlogArticleRepositoryClass = require('../../blogArticles/repositories/BlogArticleRepository');
const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');

const BlogArticleRepository = new BlogArticleRepositoryClass();

class BlogCategoryRepository extends ClassificationRepository {
    model() {
        return BlogCategory;
    }

    async getCategories() {
        return this.model
            .aggregate([
                {
                    $project: {
                        name: 1, slug: 1,
                    },
                },
                {
                    $lookup: {
                        from: 'blog_articles',
                        let: { id: '$_id' },
                        as: 'countArticle',
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ['$category', '$$id'],
                                    },
                                },
                            },
                            {
                                $count: 'count',
                            },
                        ],
                    },
                },
                {
                    $sort: {
                        'countArticle.0.count': -1,
                    },
                },
            ]);
    }

    async delete(id) {
        await BlogArticleRepository.baseDelete({ category: id });

        return this.deleteById(id);
    }
}

module.exports = BlogCategoryRepository;
