const responseHelper = require('../../../helpers/responseHelper');
const PropertyCategoryRepositoryClass = require('../../propertyCategories/repositories/PropertyCategoryRepository');
const PropertyTypeRepositoryClass = require('../../propertyTypes/repositories/PropertyTypeRepository');
const PropertyStatusRepositoryClass = require('../../propertyStatuses/repositories/PropertyStatusRepository');
const CityRepositoryClass = require('../../cities/repositories/CityRepository');
// const AmenityRepositoryClass = require('../../propertyAmenities/repositories/CityRepository');


const create = (req, res, next) => {
    try {
        // const [] = Promise.all([
        //
        // ]);
        return res.render('modules/propertyArticles/admin/create');
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = { create };
