const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');
const PropertyCategory = require('../models/PropertyCategory');
const PropertyArticleRepositoryClass = require('../../propertyArticles/repositories/PropertyArticleRepository');

const PropertyArticleRepository = new PropertyArticleRepositoryClass();

class PropertyCategoryRepository extends ClassificationRepository {
    model() {
        return PropertyCategory;
    }

    async delete(id) {
        await PropertyArticleRepository.baseDelete({ category: id });

        return this.deleteById(id);
    }
}

module.exports = PropertyCategoryRepository;
