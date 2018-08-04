const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');
const PropertyStatus = require('../models/PropertyStatus');

class PropertyStatusRepository extends ClassificationRepository {
    model() {
        return PropertyStatus;
    }
}

module.exports = PropertyStatusRepository;
