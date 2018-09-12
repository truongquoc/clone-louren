const BaseRepository = require('./BaseRepository');

class ArticleRepository extends BaseRepository {
    getEditArticle(slug) {
        return this.getDetail({ slug }, { select: '-author -isApproved -createdAt -updatedAt -__v' });
    }

    async approve(id) {
        const article = await this.model.findById(id).select('isApproved');
        article.isApproved = !article.isApproved;
        return article.save();
    }
}

module.exports = ArticleRepository;
