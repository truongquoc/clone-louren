const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');
const PropertyArticle = require('../models/PropertyArticle');

class PropertyArticleRepository extends BaseRepository {
    model() {
        return PropertyArticle;
    }
}

module.exports = PropertyArticleRepository;
