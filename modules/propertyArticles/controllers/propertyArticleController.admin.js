const responseHelper = require('../../../helpers/responseHelper');
const PropertyAmenityRepositoryClass = require('../../propertyAmenities/repositories/PropertyAmenityRepository');
const PropertyCategoryRepositoryClass = require('../../propertyCategories/repositories/PropertyCategoryRepository');
const PropertyConditionRepositoryClass = require('../../propertyConditions/repositories/PropertyConditionRepository');
const PropertyTypeRepositoryClass = require('../../propertyTypes/repositories/PropertyTypeRepository');
const PropertyStatusRepositoryClass = require('../../propertyStatuses/repositories/PropertyStatusRepository');
const CityRepositoryClass = require('../../cities/repositories/CityRepository');
const DistrictRepositoryClass = require('../../districts/repositories/DistrictRepository');

const PropertyAmenityRepository = new PropertyAmenityRepositoryClass();
const PropertyCategoryRepository = new PropertyCategoryRepositoryClass();
const PropertyConditionRepository = new PropertyConditionRepositoryClass();
const PropertyTypeRepository = new PropertyTypeRepositoryClass();
const PropertyStatusRepository = new PropertyStatusRepositoryClass();
const CityRepository = new CityRepositoryClass();
const DistrictRepository = new DistrictRepositoryClass();


const create = async (req, res, next) => {
    try {
        const [
            propertyAmenities,
            propertyConditions,
            propertyCategories,
            propertyTypes,
            propertyStatuses,
            cities,
            districts,
        ] = await Promise.all([
            PropertyAmenityRepository.baseGet(),
            PropertyConditionRepository.baseGet(),
            PropertyCategoryRepository.baseGet(),
            PropertyTypeRepository.baseGet(),
            PropertyStatusRepository.baseGet(),
            CityRepository.baseGet(),
            DistrictRepository.baseGet(),
        ]);

        return res.render('modules/propertyArticles/admin/create', {
            propertyAmenities,
            propertyConditions,
            propertyCategories,
            propertyTypes,
            propertyStatuses,
            cities,
            districts,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = { create };
