const ProductTag = require('../models/ProductTag');
const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');

class ProductTagRepository extends ClassificationRepository {
    model() {
        return ProductTag;
    }
}


module.exports = ProductTagRepository;
