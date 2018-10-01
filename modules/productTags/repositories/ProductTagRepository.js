const BlogTag = require('../models/ProductTag');
const ClassificationRepository = require('../../../infrastructure/repositories/ClassificationRepository');

class ProductTagRepository extends ClassificationRepository {
    model() {
        return BlogTag;
    }
}


module.exports = ProductTagRepository;
