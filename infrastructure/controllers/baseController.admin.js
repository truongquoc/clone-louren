const PropertyCategoryRepositoryClass = require('../../modules/propertyCategories/repositories/PropertyCategoryRepository');
const PropertyStatusRepositoryClass = require('../../modules/propertyStatuses/repositories/PropertyStatusRepository');
const PropertyTypeRepositoryClass = require('../../modules/propertyTypes/repositories/PropertyTypeRepository');
const CityRepositoryClass = require('../../modules/cities/repositories/CityRepository');
const DistrictRepositoryClass = require('../../modules/districts/repositories/DistrictRepository');
const PropertyAmenityRepositoryClass = require('../../modules/propertyAmenities/repositories/PropertyAmenityRepository');
const PropertyConditionRepositoryClass = require('../../modules/propertyConditions/repositories/PropertyConditionRepository');
const PriceTypeRepositoryClass = require('../../modules/priceTypes/repositories/PriceTypeRepository');

const PropertyCategoryRepository = new PropertyCategoryRepositoryClass();
const PropertyStatusRepository = new PropertyStatusRepositoryClass();
const PropertyTypeRepository = new PropertyTypeRepositoryClass();
const CityRepository = new CityRepositoryClass();
const DistrictRepository = new DistrictRepositoryClass();
const PropertyAmenityRepository = new PropertyAmenityRepositoryClass();
const PropertyConditionRepository = new PropertyConditionRepositoryClass();
const PriceTypeRepository = new PriceTypeRepositoryClass();

const getCreateData = () => [
    PropertyAmenityRepository.baseGet(),
    PropertyConditionRepository.baseGet(),
    PropertyCategoryRepository.baseGet(),
    PropertyTypeRepository.baseGet(),
    PropertyStatusRepository.baseGet(),
    CityRepository.baseGet(),
    DistrictRepository.baseGet(),
    PriceTypeRepository.baseGet(),
];

const clientGetCreateData = () => {
    const data = getCreateData();
    data.splice(4, 1);
    data.splice(2, 1);

    return data;
};

module.exports = {
    getCreateData,
    clientGetCreateData,
};
