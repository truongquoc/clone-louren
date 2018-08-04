const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');
const PropertyCategory = require('../models/PropertyCategory');

class PropertyCategoryRepository extends ClassificationRepository {
    model() {
        return PropertyCategory;
    }
}

module.exports = PropertyCategoryRepository;
