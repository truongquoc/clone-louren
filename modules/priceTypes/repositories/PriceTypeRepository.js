const AssetRepository = require('../../../infrastructure/repositories/AssetRepository');
const PriceType = require('../models/PriceType');
const PropertyArticleRepositoryClass = require('../../propertyArticles/repositories/PropertyArticleRepository');

const PropertyArticleRepository = new PropertyArticleRepositoryClass();

class PriceTypeRepository extends AssetRepository {
    model() {
        return PriceType;
    }

    async delete(id) {
        await PropertyArticleRepository.baseUpdate({ 'price.type': undefined }, {
            'price.type': id,
        });

        return this.deleteById(id);
    }
}

module.exports = PriceTypeRepository;
