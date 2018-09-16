const ProductBill = require('../models/ProductBill');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');

class ProductBillRepository extends BaseRepository {
    model() {
        return ProductBill;
    }

    async show(id) {
        this.model.find();
    }
}

module.exports = ProductBillRepository;
