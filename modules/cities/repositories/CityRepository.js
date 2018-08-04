const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');
const City = require('../models/City');

class CityRepository extends ClassificationRepository {
    model() {
        return City;
    }
}

module.exports = CityRepository;
