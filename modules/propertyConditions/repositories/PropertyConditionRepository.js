const AssetRepository = require('../../../infrastructure/repositories/AssetRepository');
const PropertyCondition = require('../models/PropertyCondition');

class PropertyConditionRepository extends AssetRepository {
    model() {
        return PropertyCondition;
    }
}

module.exports = PropertyConditionRepository;
