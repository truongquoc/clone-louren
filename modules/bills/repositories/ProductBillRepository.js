const ProductBill = require('../models/ProductBill');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');

class ProductBillRepository extends BaseRepository {
    model() {
        return ProductBill;
    }
}

module.exports = ProductBillRepository;
