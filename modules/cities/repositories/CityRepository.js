const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');
const City = require('../models/City');
const DistrictRepositoryClass = require('../../districts/repositories/DistrictRepository');
const PropertyArticleRepositoryClass = require('../../propertyArticles/repositories/PropertyArticleRepository');

const DistrictRepository = new DistrictRepositoryClass();
const PropertyArticleRepository = new PropertyArticleRepositoryClass();

class CityRepository extends ClassificationRepository {
    model() {
        return City;
    }

    async delete(id) {
        await PropertyArticleRepository.baseDelete({ city: id });
        await DistrictRepository.baseDelete({ city: id });

        return this.deleteById(id);
    }
}

module.exports = CityRepository;
