const AssetRepository = require('../../../infrastructure/repositories/AssetRepository');
const PriceType = require('../models/PriceType');

class PriceTypeRepository extends AssetRepository {
    model() {
        return PriceType;
    }
}

module.exports = PriceTypeRepository;
