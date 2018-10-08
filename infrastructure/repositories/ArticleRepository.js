const BaseRepository = require('./BaseRepository');

class ArticleRepository extends BaseRepository {
    getEditArticle(slug) {
        return this.model
            .findOne({
                slug,
                deletedAt: null,
            })
            .populate({
                path: 'tags',
                select: '_id',
                match: { deletedAt: null },
            })
            .select('-author -isApproved -createdAt -updatedAt -__v');
    }

    async approve(id) {
        const article = await this.model.findById(id).select('isApproved');
        article.isApproved = !article.isApproved;
        return article.save();
    }
}

module.exports = ArticleRepository;
