const AssetRepository = require('../../../infrastructure/repositories/AssetRepository');
const PropertyAmenity = require('../models/PropertyAmenity');

class PropertyAmenityRepository extends AssetRepository {
    model() {
        return PropertyAmenity;
    }
}

module.exports = PropertyAmenityRepository;
