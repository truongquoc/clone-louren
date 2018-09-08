const { promisify } = require('util');
const redis = require('redis');
const PropertyStatusRepositoryClass = require('../../modules/propertyStatuses/repositories/PropertyStatusRepository');
const PropertyTypeRepositoryClass = require('../../modules/propertyTypes/repositories/PropertyTypeRepository');
const CityRepositoryClass = require('../../modules/cities/repositories/CityRepository');
const DistrictRepositoryClass = require('../../modules/districts/repositories/DistrictRepository');
const PropertyAmenityRepositoryClass = require('../../modules/propertyAmenities/repositories/PropertyAmenityRepository');
const PropertyConditionRepositoryClass = require('../../modules/propertyConditions/repositories/PropertyConditionRepository');

const client = redis.createClient();
const getRedisAsync = promisify(client.get).bind(client);
const PropertyStatusRepository = new PropertyStatusRepositoryClass();
const PropertyTypeRepository = new PropertyTypeRepositoryClass();
const CityRepository = new CityRepositoryClass();
const DistrictRepository = new DistrictRepositoryClass();
const PropertyAmenityRepository = new PropertyAmenityRepositoryClass();
const PropertyConditionRepository = new PropertyConditionRepositoryClass();

const getSearchData = async () => {
    const conditions = await getRedisAsync('searchConditions') || '[]';
    return [
        PropertyTypeRepository.baseGet(),
        CityRepository.baseGet(),
        DistrictRepository.baseGet(),
        PropertyAmenityRepository.baseGet(),
        PropertyConditionRepository.getManyByIds(JSON.parse(conditions)),
    ];
};

module.exports = {
    getSearchData,
};
