const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');
const PropertyStatus = require('../models/PropertyStatus');
const PropertyArticleRepositoryClass = require('../../propertyArticles/repositories/PropertyArticleRepository');

const PropertyArticleRepository = new PropertyArticleRepositoryClass();

class PropertyStatusRepository extends ClassificationRepository {
    model() {
        return PropertyStatus;
    }

    async delete(id) {
        await PropertyArticleRepository.baseDelete({ status: id });

        return this.deleteById(id);
    }
}

module.exports = PropertyStatusRepository;
