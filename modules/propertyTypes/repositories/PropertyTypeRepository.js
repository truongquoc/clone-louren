const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');
const PropertyType = require('../models/PropertyType');

class PropertyTypeRepository extends ClassificationRepository {
    model() {
        return PropertyType;
    }
}

module.exports = PropertyTypeRepository;
