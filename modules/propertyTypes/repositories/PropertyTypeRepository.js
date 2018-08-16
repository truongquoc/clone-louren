const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');
const PropertyType = require('../models/PropertyType');
const PropertyArticleRepositoryClass = require('../../propertyArticles/repositories/PropertyArticleRepository');

const PropertyArticleRepository = new PropertyArticleRepositoryClass();

class PropertyTypeRepository extends ClassificationRepository {
    model() {
        return PropertyType;
    }

    async delete(id) {
        await PropertyArticleRepository.baseDelete({ type: id });

        return this.deleteById(id);
    }
}

module.exports = PropertyTypeRepository;
